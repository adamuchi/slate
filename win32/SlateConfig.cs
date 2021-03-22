using System.Collections.Generic;
using System.Linq;

namespace Slate
{
    public class SlateConfig
    {
        public static readonly int MaxRecent = 10;
        public class WorldCharacter
        {
            public string World { get; set; }
            public string Character { get; set; }
        }

        public class Character
        {
            public string Name { get; set; }
            public string Password { get; set; }
        }

        public class World
        {
            public string Name { get; set; }
            public string Address { get; set; }
            public int Port { get; set; }
            public List<Character> Characters { get; set; } = new List<Character>();

            public Character GetCharacter(string name) => Characters.FirstOrDefault(c => string.Compare(c.Name,name, true) == 0);
        }

        public List<World> Worlds { get; set; } = new List<World>();

        public List<WorldCharacter> Recent { get; set; } = new List<WorldCharacter>();

        public void AddRecent(World w, Character c)
        {
            Recent.Add(new WorldCharacter { World = w.Name, Character = c.Name });
            if(Recent.Count > MaxRecent)
            {
                Recent.RemoveRange(0, Recent.Count - MaxRecent);
            }
        }

        public World GetWorld(string name) => Worlds.FirstOrDefault(w => string.Compare(w.Name, name, true) == 0);
    }
}
