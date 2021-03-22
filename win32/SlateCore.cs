using System;
using System.IO;
using System.Windows.Forms;
using System.Xml.Serialization;

namespace Slate
{
    class SlateCore : ApplicationContext
    {
        public static readonly string ConfigFile = "slateconfig.xml";
        public static readonly string LogFile = "slate.log";

        public enum LogLevel { Debug, Info, Warning, Error }

        public static void Log(string message, LogLevel level)
        {
            try
            {
                using (var stream = new StreamWriter(LogFile))
                {
                    stream.WriteLine($"{DateTime.Now} ({level}): {message}");
                }
            }
            catch (Exception e)
            {
                MessageBox.Show(e.Message, "Error Logging", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public static void RegisterForm(Form form) {
            form.FormClosed += (sender, e) =>
            {
                if(Application.OpenForms.Count == 0)
                {
                    Shutdown();
                }
            };
        }

        public static void Shutdown()
        {
            SaveConfig();
            instance.ExitThread();
        }

        public static SlateConfig Config { get; private set; }

        public static void SaveConfig()
        {
            try
            {
                var serializer = new XmlSerializer(typeof(SlateConfig));
                using (var stream = new StreamWriter(ConfigFile))
                {
                    serializer.Serialize(stream, Config);
                }
            }
            catch(Exception e)
            {
                Log("Couldn't save config: " + e.Message, LogLevel.Error);
                MessageBox.Show(e.Message, "Error Saving", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private static SlateCore instance;

        private SlateConfig LoadOrCreateConfig()
        {
            try
            {
                var serializer = new XmlSerializer(typeof(SlateConfig));
                using (var stream = new StreamReader(ConfigFile))
                {
                    return (SlateConfig)serializer.Deserialize(stream);
                }
            }
            catch(Exception e)
            {
                Log("Couldn't load config: " + e.Message, LogLevel.Info);
                return new SlateConfig();
            }
        }

        public SlateCore()
        {
            instance = this;

            // Get our config
            Config = LoadOrCreateConfig();

            // Show the main form
            var form = new MainForm();
            form.Show();
        }
    }
}
