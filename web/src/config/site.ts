export const siteConfig = {
  name: "gkey",
  title: "gkey — Native Linux Ethiopic Phonetic Input",
  description:
    "Type Ethiopic naturally on Linux with a lightweight phonetic input method built for evdev, uinput, Wayland, X11, and TTY workflows.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://gkey.aaronpweb.dev",
  links: {
    github: "https://github.com/aaronpweb/gkey",
    sponsors: "https://github.com/sponsors/aaronpweb",
    docs: "https://gkey.aaronpweb.dev/docs",
    author: "https://github.com/aaronpweb",
    issues: "https://github.com/aaronpweb/gkey/issues",
    contributing:
      "https://github.com/aaronpweb/gkey/blob/main/CONTRIBUTING.md",
  },
} as const;

export const installTabs = [
  {
    id: "quick",
    label: "Quick Install (README)",
    description: "Clone the repository and run the automated installer script.",
    commands: `git clone https://github.com/aaronpweb/gkey.git
cd gkey
chmod +x install.sh
sudo ./install.sh`,
  },
  {
    id: "manual",
    label: "Manual & Systemd Setup",
    description: "Build from source and enable the background gkey daemon.",
    commands: `git clone https://github.com/aaronpweb/gkey.git
cd gkey
# Ensure user has permissions to read /dev/input/event* and write /dev/uinput
sudo usermod -aG input $USER
# Install binary & systemd service
sudo make install
sudo systemctl enable --now gkey.service`,
  },
  {
    id: "usage",
    label: "CLI & Toggle Controls",
    description: "Control gkey directly from your terminal or keybinding.",
    commands: `# Check daemon status
systemctl status gkey

# Run directly in foreground for debugging evdev keycodes
sudo gkey --verbose`,
  },
] as const;

export type InstallTabId = (typeof installTabs)[number]["id"];
