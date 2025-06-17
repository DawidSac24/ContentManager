# Content Manager Chrome Extension

[Content Manager](https://chromewebstore.google.com/detail/content-manager/lobbohngjkkghmganebnahlfajlahkic) is a powerful Chrome extension that helps you organize and manage your browsing sessions by creating and switching between different contexts. Each context represents a group of related web pages that you frequently access together.

## 🎯 Purpose

The main purpose of Content Manager is to help you maintain focus and productivity by organizing your browsing sessions into logical groups. For example:

- **Work Context**: All the tabs you need for your job (email, project management, documentation)
- **Development Context**: Your coding environment, GitHub, Stack Overflow, and other developer tools
- **Personal Context**: Social media, news sites, and personal projects
- **Study Context**: Educational resources, research papers, and learning platforms

## 🚀 Install the Extension

You can install it on the [Chrome web store](https://chromewebstore.google.com/detail/content-manager/lobbohngjkkghmganebnahlfajlahkic)

OR you can manually download the latest ready-to-use version here:

👉 [GitHub Releases](https://github.com/DawidSac24/ContentManager/releases)

Follow these steps to install it:

1. Extract the ZIP
2. Go to `chrome://extensions`
3. Enable Developer Mode
4. Click "Load Unpacked"
5. Select the extracted folder

## ⚙️ How It Works

1. **Create Contexts**: Define different contexts with custom names and icons
2. **Save Your Context**: Add your currently open pages to your selected context
3. **Switch Contexts**: With a single click, switch between contexts:
   - Open all the pages associated with your selected context
   - You can instantly shift your focus from work to study, or from personal to development

## ✨ Features

- **Context Management**: Create, edit, and delete contexts
- **Page Organization**: Group related pages into contexts
- **Quick Switching**: Instantly switch between different browsing environments
- **Persistence**: Your contexts and pages are saved between browser sessions

## 💡 Use Cases

- **Work-Life Balance**: Keep your work and personal browsing separate
- **Project Management**: Create contexts for different projects
- **Learning**: Organize educational resources by subject or course
- **Research**: Group research materials by topic
- **Development**: Switch between different development environments

## 🛠️ Technical Details

Content Manager consists of:

- A Chrome extension frontend built with **Vite** and **React TypeScript**
- A local server with back-end implementation inside of Vite
- A **IndexedDB** local database

## 🚧 Development Status

This project is currently in active development. Features and functionality may change as development progresses.

# TODO

- [ ] Add a settings option that opens a web page for better context management, more settings, and customization (e.g., deleting selected pages from a context)
- [ ] Set up a server to allow user synchronization between devices OR add encryption/database conversion to generate a sync code
