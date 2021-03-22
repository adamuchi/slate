using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Slate
{
    public partial class MainForm : Form
    {
        public MainForm()
        {
            InitializeComponent();
            InitializeMenuItems();
            InitializeEvents();

            SlateCore.RegisterForm(this);
        }

        private void InitializeMenuItems()
        {
            aboutItem.Click += (sender, e) =>
            {
                var aboutForm = new AboutForm();
                aboutForm.ShowDialog();
            };

            newWindowItem.Click += (sender, e) =>
            {
                var mainForm = new MainForm();
                mainForm.Show();
            };

            closeItem.Click += (sender, e) => Close();

            openGameItem.Click += HandleOpenGame;
            saveGameItem.Click += HandleSaveGame;
            quickConnectItem.Click += HandleQuickConnect;
            disconnectItem.Click += HandleDisconnect;

            var recent = SlateCore.Config.Recent;
            if(recent.Count > 0)
            {
                openRecentItem.DropDownItems.Clear();
                int i = 0;
                foreach(var pair in recent)
                {
                    var index = i++;
                    var menuItem = new ToolStripMenuItem($"{index}: {pair.World} - {pair.Character}");
                    menuItem.Click += (sender, e) => OpenGameTab(pair.World, pair.Character);
                }
            }
        }

        private void HandleOpenGame(object sender, EventArgs e)
        {
            MessageBox.Show("Open Game");
        }

        private void HandleSaveGame(object sender, EventArgs e)
        {
            MessageBox.Show("Save Game");
        }

        private void HandleQuickConnect(object sender, EventArgs e)
        {
            MessageBox.Show("Quick Connect");
        }

        private void HandleDisconnect(object sender, EventArgs e)
        {
            MessageBox.Show("Disconnect");
        }

        private void InitializeEvents()
        {
            FormClosing += (sender, e) =>
            {
                // Do nothing for now; this will need to close all open games
            };
        }

        private void OpenGameTab(string worldName, string characterName)
        {
            var world = SlateCore.Config.GetWorld(worldName);
            if(world == null)
            {
                var message = $"Cannot find world \"{worldName}\"";
                SlateCore.Log(message, SlateCore.LogLevel.Error);
                MessageBox.Show(message, "Error loading world", MessageBoxButtons.OK, MessageBoxIcon.Error);
                return;
            }

            var character = world.GetCharacter(characterName);
            if(character == null)
            {
                var message = $"Cannot find character \"{characterName}\" in world \"{worldName}\"";
                SlateCore.Log(message, SlateCore.LogLevel.Error);
                MessageBox.Show(message, "Error loading world", MessageBoxButtons.OK, MessageBoxIcon.Error);
                return;
            }

            MessageBox.Show($"Open \"{world.Name}\", \"{character.Name}\"");
        }
    }
}
