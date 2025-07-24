<<<<<<< HEAD

# 🎓 Study Abroad Assistant

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-412991?style=flat-square&logo=openai)](https://openai.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

> **An AI-powered web application that provides personalized university recommendations and Statement of Purpose (SOP) assistance for students planning to study abroad.**

![Study Abroad Assistant Demo](https://via.placeholder.com/800x400/0D1117/58A6FF?text=Study+Abroad+Assistant+Demo)

## ✨ Features

- 🎯 **AI-Powered University Recommendations** - Get personalized university suggestions based on your academic profile, budget, and preferences
- 📧 **Smart Email Delivery** - Receive beautifully formatted recommendations and documents via email with professional PDF attachments
- 📝 **SOP Assistant** - Get AI-powered feedback, suggestions, and complete drafts for your Statement of Purpose
- 💬 **Interactive Chat Interface** - Intuitive conversational interface powered by modern React components
- 📄 **Professional PDF Generation** - High-quality PDF documents for university lists, SOP feedback, and reports
- 🌍 **Global Coverage** - Comprehensive support for universities and programs across multiple countries
- 🔒 **Secure & Private** - Your data is processed securely with industry-standard practices
- 📱 **Responsive Design** - Perfect experience across desktop, tablet, and mobile devices

## 🛠️ Technology Stack

| Category           | Technologies                                   |
| ------------------ | ---------------------------------------------- |
| **Frontend**       | Next.js 15, React 19, TypeScript, Tailwind CSS |
| **UI Components**  | shadcn/ui, Radix UI, Lucide React              |
| **AI/ML**          | OpenAI GPT-4, AI SDK                           |
| **Email**          | Nodemailer with Gmail SMTP                     |
| **PDF Generation** | Puppeteer, jsPDF, html2canvas                  |
| **Form Handling**  | React Hook Form, Zod validation                |
| **Styling**        | Tailwind CSS, CSS Variables, Dark Mode         |
| **Development**    | TypeScript, ESLint, Prettier                   |

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.0 or higher
- **npm**, **yarn**, or **pnpm** package manager
- **OpenAI API Key** (required)
- **Gmail Account** with App Password (optional, for email features)

### 1. Clone the Repository

```bash
git clone https://github.com/PreciousNwogu/study-abroad-assistant.git
cd study-abroad-assistant
```

### 2. Install Dependencies

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm (recommended)
pnpm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
# OpenAI API Configuration (Required)
OPENAI_API_KEY=your-openai-api-key-here

# Gmail SMTP Configuration (Optional - for email features)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password

# Application Configuration (Optional)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> **⚠️ Important**: Never commit your `.env.local` file to version control. It's already included in `.gitignore`.

### 4. Get Your OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the key and add it to your `.env.local` file

### 5. Configure Email (Optional but Recommended)

For email functionality, you'll need to set up Gmail SMTP:

1. **Enable 2-Step Verification** on your Gmail account
2. **Generate an App Password** for the application
3. **Update** the `EMAIL_USER` and `EMAIL_PASS` in `.env.local`

**📖 See [NODEMAILER_SETUP.md](./NODEMAILER_SETUP.md) for detailed email setup instructions.**

### 6. Run the Development Server

```bash
# Using npm
npm run dev

# Using yarn
yarn dev

# Using pnpm
pnpm dev
```

🎉 **Open [http://localhost:3000](http://localhost:3000) to view the application!**

## 📸 Screenshots

<details>
<summary>Click to view screenshots</summary>

### Main Interface

![Main Interface](https://via.placeholder.com/600x400/0D1117/58A6FF?text=Main+Chat+Interface)

### University Recommendations

![University Recommendations](https://via.placeholder.com/600x400/0D1117/58A6FF?text=University+Recommendations)

### SOP Assistant

![SOP Assistant](https://via.placeholder.com/600x400/0D1117/58A6FF?text=SOP+Assistant)

### Email & PDF Generation

![Email Features](https://via.placeholder.com/600x400/0D1117/58A6FF?text=Email+%26+PDF+Features)

</details>

## 🔌 API Endpoints

### University Recommendations

| Method | Endpoint               | Description                               |
| ------ | ---------------------- | ----------------------------------------- |
| `POST` | `/api/recommendations` | Get AI-powered university recommendations |
| `POST` | `/api/send-email`      | Send university list via email with PDF   |

### SOP Assistant

| Method | Endpoint                         | Description                                 |
| ------ | -------------------------------- | ------------------------------------------- |
| `POST` | `/api/generate-sop`              | Generate SOP draft based on user input      |
| `POST` | `/api/generate-premium-sop`      | Generate premium SOP with advanced features |
| `POST` | `/api/generate-professional-sop` | Generate professional SOP service           |
| `POST` | `/api/sop-feedback`              | Get detailed feedback on existing SOP       |
| `POST` | `/api/send-premium-sop`          | Send premium SOP via email                  |

### Email & Document Services

| Method | Endpoint             | Description                     |
| ------ | -------------------- | ------------------------------- |
| `POST` | `/api/send-document` | Send custom documents via email |
| `POST` | `/api/test-email`    | Test email configuration        |

### Admin & Analytics

| Method | Endpoint            | Description             |
| ------ | ------------------- | ----------------------- |
| `POST` | `/api/assign-agent` | Agent assignment system |
| `POST` | `/api/agent-payout` | Agent payout management |

## ⚙️ Configuration

### OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a new API key
3. Add it to your `.env.local` file as `OPENAI_API_KEY`

### Email Configuration

The application uses Nodemailer with Gmail SMTP for email delivery:

- **Development**: Emails are logged to console if no credentials provided
- **Production**: Requires Gmail App Password for SMTP authentication

**📖 See [NODEMAILER_SETUP.md](./NODEMAILER_SETUP.md) for complete setup instructions.**

## 📁 Project Structure

```
study-abroad-assistant/
├── 📁 app/                             # Next.js App Router
│   ├── 📁 api/                         # API Routes
│   │   ├── 📄 recommendations/route.ts  # University recommendations
│   │   ├── 📄 generate-sop/route.ts     # SOP generation
│   │   ├── 📄 generate-premium-sop/     # Premium SOP services
│   │   ├── 📄 generate-professional-sop/# Professional SOP services
│   │   ├── 📄 sop-feedback/route.ts     # SOP feedback
│   │   ├── 📄 send-email/route.ts       # Email delivery
│   │   ├── 📄 assign-agent/route.ts     # Agent assignment
│   │   └── 📄 agent-payout/route.ts     # Agent payout system
│   ├── 📁 admin/                       # Admin dashboard
│   ├── 📁 professional-sop/            # Professional SOP pages
│   ├── 📁 test-emails/                 # Email testing pages
│   ├── 📄 globals.css                  # Global styles
│   ├── 📄 layout.tsx                   # Root layout
│   └── 📄 page.tsx                     # Home page
├── 📁 components/                      # React Components
│   ├── 📄 chat-interface.tsx           # Main chat interface
│   ├── 📄 sop-assistant.tsx            # SOP assistant
│   ├── 📄 premium-sop-wizard.tsx       # Premium SOP wizard
│   ├── 📄 professional-sop-form.tsx    # Professional SOP form
│   ├── 📄 enhanced-admin-dashboard.tsx # Admin dashboard
│   ├── 📄 payment-component.tsx        # Payment integration
│   └── 📁 ui/                          # shadcn/ui components
├── 📁 lib/                             # Utility Libraries
│   ├── 📄 email-service.ts             # Email service (Nodemailer)
│   ├── 📄 pdf-generator.ts             # PDF generation
│   ├── 📄 premium-sop-pdf.ts          # Premium PDF generation
│   ├── 📄 agent-assignment.ts          # Agent assignment logic
│   ├── 📄 level-requirements.ts        # Academic level requirements
│   └── 📄 utils.ts                     # General utilities
├── 📁 hooks/                           # Custom React Hooks
├── 📁 public/                          # Static Assets
├── 📁 styles/                          # Styling
├── 📄 package.json                     # Dependencies
├── 📄 tailwind.config.ts              # Tailwind configuration
├── 📄 next.config.mjs                 # Next.js configuration
└── 📄 tsconfig.json                   # TypeScript configuration
```

## 🌟 Features Overview

### 🎯 University Recommendations

- **Smart Filtering**: Input preferences (country, course, budget, academic level)
- **AI-Powered Matching**: Get personalized recommendations using advanced AI
- **Detailed Information**: Comprehensive university profiles with requirements
- **PDF Reports**: Professional PDF attachments via email
- **Multiple Countries**: Support for universities worldwide

### 📝 SOP Assistant

- **Draft Generation**: Create complete SOP drafts based on your background
- **Intelligent Feedback**: Get detailed, actionable feedback on existing SOPs
- **Multiple Service Tiers**: Basic, Premium, and Professional SOP services
- **Professional Reports**: High-quality PDF feedback reports
- **Email Integration**: Seamless delivery of all documents

### 💼 Premium Services

- **Professional SOP Writing**: Expert-level SOP creation services
- **Agent Partnership System**: Connect with education consultants
- **Payment Integration**: Secure payment processing for premium features
- **Admin Dashboard**: Comprehensive management interface

### 📧 Email Integration

- **Professional Templates**: Beautiful HTML email templates
- **PDF Attachments**: High-quality document generation
- **SMTP Integration**: Reliable Gmail SMTP with App Password
- **Development Mode**: Console logging fallback for testing

## 🚀 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/PreciousNwogu/study-abroad-assistant)

1. **Push to GitHub**: Commit your code to a GitHub repository
2. **Connect to Vercel**: Import your repository in Vercel dashboard
3. **Add Environment Variables**: Configure your secrets in Vercel settings
4. **Deploy**: Automatic deployment on every push to main branch

### Environment Variables for Production

```bash
OPENAI_API_KEY=your-openai-api-key
EMAIL_USER=your-production-email@gmail.com
EMAIL_PASS=your-gmail-app-password
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### Alternative Deployment Platforms

The application is compatible with any platform supporting Next.js:

| Platform         | Documentation                                                                                            |
| ---------------- | -------------------------------------------------------------------------------------------------------- |
| **Netlify**      | [Deploy Next.js on Netlify](https://docs.netlify.com/frameworks/next-js/)                                |
| **Railway**      | [Deploy Next.js on Railway](https://railway.app/template/next-js)                                        |
| **DigitalOcean** | [App Platform Next.js](https://docs.digitalocean.com/products/app-platform/languages-frameworks/nodejs/) |
| **AWS Amplify**  | [Deploy Next.js on AWS](https://aws.amazon.com/amplify/framework/)                                       |

## 🛠️ Development

### Adding New Features

1. **API Routes**: Add new routes in `app/api/` directory
2. **Components**: Create reusable components in `components/`
3. **Utilities**: Add helper functions in `lib/`
4. **Styling**: Use Tailwind CSS classes and CSS variables

### Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

### Testing Email Functionality

1. **Without Gmail Setup**: Emails are logged to console (development mode)
2. **With Gmail Setup**: Real emails are sent to recipients
3. **Debug Mode**: Check browser console for detailed logs

### Code Style & Conventions

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting and formatting
- **Tailwind CSS**: Utility-first styling approach
- **Component Structure**: Modular, reusable components
- **API Design**: RESTful API endpoints with proper error handling

## 🔧 Environment Variables

### Required Variables

| Variable         | Description                    | Example  |
| ---------------- | ------------------------------ | -------- |
| `OPENAI_API_KEY` | OpenAI API key for AI features | `sk-...` |

### Optional Variables

| Variable              | Description                      | Default                 | Example                  |
| --------------------- | -------------------------------- | ----------------------- | ------------------------ |
| `EMAIL_USER`          | Gmail address for sending emails | -                       | `your-email@gmail.com`   |
| `EMAIL_PASS`          | Gmail App Password               | -                       | `abcd efgh ijkl mnop`    |
| `NEXT_PUBLIC_APP_URL` | Application URL                  | `http://localhost:3000` | `https://yourdomain.com` |

## 🐛 Troubleshooting

### Common Issues

| Issue                     | Solution                                                                   |
| ------------------------- | -------------------------------------------------------------------------- |
| **API Key Errors**        | Verify OpenAI API key is correct and has sufficient credits                |
| **Email Not Sending**     | Check Gmail App Password setup and 2FA enabled                             |
| **PDF Generation Errors** | Ensure sufficient memory for Puppeteer (increase Node.js memory if needed) |
| **Build Errors**          | Clear `.next` folder and reinstall dependencies                            |
| **TypeScript Errors**     | Run `npm run lint` to identify and fix type issues                         |

### Debug Mode

Enable detailed logging:

1. **Check Console**: Browser console shows API requests/responses
2. **Server Logs**: Terminal shows email delivery status and PDF generation
3. **Network Tab**: Use browser dev tools to inspect API calls

### Getting Help

- 📖 **Email Setup**: See [NODEMAILER_SETUP.md](./NODEMAILER_SETUP.md)
- 🔍 **Debug**: Check console logs for error details
- 🐛 **Issues**: [Open a GitHub issue](https://github.com/PreciousNwogu/study-abroad-assistant/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/PreciousNwogu/study-abroad-assistant/discussions)

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Getting Started

1. **Fork** the repository
2. **Clone** your fork locally
3. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
4. **Make** your changes
5. **Test** thoroughly (ensure all features work)
6. **Commit** your changes (`git commit -m 'Add amazing feature'`)
7. **Push** to your branch (`git push origin feature/amazing-feature`)
8. **Submit** a Pull Request

### Development Guidelines

- Follow the existing code style and conventions
- Add TypeScript types for all new code
- Test your changes thoroughly before submitting
- Update documentation for any new features
- Ensure your code works with both email enabled and disabled

### Types of Contributions

- 🐛 **Bug fixes**
- ✨ **New features**
- 📚 **Documentation improvements**
- 🎨 **UI/UX enhancements**
- 🔧 **Performance optimizations**
- 🌐 **Internationalization**

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Study Abroad Assistant

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🆘 Support & Community

### Get Help

| Resource                | Description                                                                                                         |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------- |
| 📖 **Documentation**    | Check our comprehensive guides and API docs                                                                         |
| 🐛 **Bug Reports**      | [Create an issue](https://github.com/PreciousNwogu/study-abroad-assistant/issues/new?template=bug_report.md)        |
| 💡 **Feature Requests** | [Request a feature](https://github.com/PreciousNwogu/study-abroad-assistant/issues/new?template=feature_request.md) |
| 💬 **Discussions**      | [Join the conversation](https://github.com/PreciousNwogu/study-abroad-assistant/discussions)                        |
| 📧 **Email Setup Help** | See [NODEMAILER_SETUP.md](./NODEMAILER_SETUP.md)                                                                    |

### Roadmap

- [ ] **Multi-language Support** - Internationalization for global users
- [ ] **Advanced Analytics** - Detailed insights and reporting
- [ ] **Mobile App** - React Native mobile application
- [ ] **LLM Integration** - Support for multiple AI providers
- [ ] **Real-time Chat** - WebSocket-based real-time features
- [ ] **University Partnerships** - Direct integration with universities
- [ ] **Scholarship Finder** - AI-powered scholarship recommendations
- [ ] **Application Tracking** - Track application status and deadlines

## 🌟 Acknowledgments

- **OpenAI** for providing powerful AI capabilities
- **Vercel** for excellent hosting and deployment
- **shadcn/ui** for beautiful, accessible components
- **Next.js Team** for the amazing React framework
- **Tailwind CSS** for utility-first styling
- **All Contributors** who help make this project better

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/PreciousNwogu/study-abroad-assistant?style=social)
![GitHub forks](https://img.shields.io/github/forks/PreciousNwogu/study-abroad-assistant?style=social)
![GitHub issues](https://img.shields.io/github/issues/PreciousNwogu/study-abroad-assistant)
![GitHub pull requests](https://img.shields.io/github/issues-pr/PreciousNwogu/study-abroad-assistant)

---

<div align="center">

**🎓 Made with ❤️ for students pursuing their dreams abroad**

[⭐ Star this repo](https://github.com/PreciousNwogu/study-abroad-assistant) • [🐛 Report Bug](https://github.com/PreciousNwogu/study-abroad-assistant/issues) • [💡 Request Feature](https://github.com/PreciousNwogu/study-abroad-assistant/issues)

</div>
