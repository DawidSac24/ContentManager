
# 🧠 Context Manager Chrome Extension

**Context Manager** is a powerful Chrome extension that helps you organize and manage your browsing sessions by creating and switching between different contexts. Each context represents a group of related web pages that you frequently access together.

## 🎯 Purpose

The main purpose of Context Manager is to help you maintain focus and productivity by organizing your browsing sessions into logical groups. For example:

- 💼 **Work Context**: All the tabs you need for your job (email, project management, documentation)
- 💻 **Development Context**: Your coding environment, GitHub, Stack Overflow, and other developer tools
- 🏠 **Personal Context**: Social media, news sites, and personal projects
- 📚 **Study Context**: Educational resources, research papers, and learning platforms

## 🚀 Install the Extension

You can download the latest ready-to-use version here:

👉 [GitHub Releases](https://github.com/DawidSac24/ContextManager/releases)

Then follow these steps:
1. 📦 Extract the ZIP
2. 🌐 Go to `chrome://extensions`
3. 🧪 Enable Developer Mode
4. 📂 Click "Load Unpacked"
5. ✅ Select the extracted folder

## ⚙️ How It Works

1. 🆕 **Create Contexts**: Define different contexts with custom names and icons
2. 💾 **Save Your Context**: Add your currently open pages to your selected context
3. 🔄 **Switch Contexts**: With a single click, switch between contexts:
   - 🗂️ The extension will close your current tabs (and save the unsaved pages inside of a temporary context)
   - 🌍 Open all the pages associated with your selected context
   - 🔁 Instantly shift your focus from work to study, or from personal to development

## ✨ Features

- 🧩 **Context Management**: Create, edit, and delete contexts
- 🗃️ **Page Organization**: Group related pages into contexts
- ⚡ **Quick Switching**: Instantly switch between different browsing environments
- 💾 **Persistence**: Your contexts and pages are saved between browser sessions

## 💡 Use Cases

- ⚖️ **Work-Life Balance**: Keep your work and personal browsing separate
- 📁 **Project Management**: Create contexts for different projects
- 🎓 **Learning**: Organize educational resources by subject or course
- 🔍 **Research**: Group research materials by topic
- 🧑‍💻 **Development**: Switch between different development environments

## 🛠️ Technical Details

Context Manager consists of:

- A Chrome extension frontend built with **Vite** and **React TypeScript**
- A local server with back-end implementation inside of Vite
- A **IndexedDB** local database

## 🚧 Development Status

This project is currently in active development. Features and functionality may change as development progresses.

## 📋 TODO

- [ ] 🔽 Add a drop-down list of the context's pages
- [ ] 🔤 Change the fonts
- [ ] 🔧 Change the front-end to back-end communication (currently accessing directly the context controller by a hook, may need to do a chrome messaging system, simulating the Express.js communication system)
