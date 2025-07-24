# Visa Agent Partnership System

A comprehensive automated system for partnering with visa agents, handling payment collection, SOP assignment, agent communication, and payout management.

## 🎯 Features Implemented

### 1. **Enhanced Country & Agent Support**

- **Expanded Country Coverage**: Canada, UK, Germany, Australia, USA with dedicated agents
- **Region-Based Organization**: North America, Europe, Oceania, Asia
- **Agent Specialization**: Separate specialists for admission SOPs and visa SOPs
- **Agent Capacity Tracking**: Commission rates, completion stats, earnings tracking

### 2. **Automated SOP Request Flow**

```
User Submission → Payment ($149-$299) → Agent Assignment → Email Notifications → SOP Delivery → Agent Payout
```

#### Payment Tiers:

- **Standard**: $149 (7-10 business days)
- **Priority**: $199 (3-5 business days)
- **Urgent**: $299 (24-48 hours)

### 3. **Professional SOP Form** (`/professional-sop`)

- **Multi-step Form**: Personal info → Education & target → Statement details
- **Country Selection**: Enhanced country picker with agent availability indicators
- **Service Type**: University admission vs. student visa SOPs
- **Comprehensive Requirements**: Career goals, academic background, work experience
- **Integrated Payment**: Seamless payment processing with commission calculation

### 4. **Automated Agent Assignment**

- **Smart Matching**: Automatically assigns based on country + service type
- **Load Balancing**: Distributes work among available agents
- **Fallback Handling**: General team support for unsupported countries
- **Commission Calculation**: Automatic calculation (30% admission, 35% visa)

### 5. **Email Automation System**

- **Agent Notifications**: Detailed assignment emails with client requirements
- **Client Confirmations**: Professional confirmation with agent details
- **Payout Notifications**: Commission payment confirmations
- **Rich HTML Templates**: Professional, branded email designs

### 6. **Admin Dashboard** (`/admin`)

- **Real-time Metrics**: Pending payouts, monthly earnings, active agents
- **Payout Management**: Review and process agent commissions
- **Request Tracking**: Monitor SOP requests and their status
- **Agent Performance**: Individual agent statistics and analytics

## 🏗️ System Architecture

### Core Components

#### **Agent Management** (`lib/agent-assignment.ts`)

```typescript
interface AgentAssignment {
  id: string;
  email: string;
  name: string;
  specialty: string;
  country: string;
  region: string;
  serviceType: "admission" | "visa";
  commissionRate: number;
  isActive: boolean;
  totalEarnings: number;
  completedOrders: number;
}
```

#### **SOP Request Tracking**

```typescript
interface SOPRequest {
  id: string;
  clientEmail: string;
  clientName: string;
  country: string;
  serviceType: "admission" | "visa";
  amount: number;
  agentCommission: number;
  status: "pending" | "assigned" | "in_progress" | "completed" | "delivered";
  // ... timestamps and details
}
```

### API Endpoints

#### **SOP Request Submission** (`/api/submit-sop-request`)

- Processes form data and payment
- Assigns appropriate agent
- Sends automated notifications
- Returns request ID and agent details

#### **Agent Assignment** (`/api/assign-agent`)

- Manual agent assignment functionality
- Agent lookup by country/service type
- Agent statistics retrieval

#### **Payout Management** (`/api/agent-payout`)

- Pending payout calculations
- Payment processing
- Agent statistics dashboard data

#### **Enhanced Email Service** (`/api/send-email`)

- Agent assignment notifications
- Client confirmation emails
- Payout notifications
- University recommendation emails (legacy)

## 🔧 Configuration

### Agent Setup

Agents are configured in `lib/agent-assignment.ts`:

```typescript
const agents: AgentAssignment[] = [
  {
    id: "CA_VISA_001",
    email: "michael.chen@studyabroadassistant.com",
    name: "Michael Chen",
    specialty: "IRCC-Certified Immigration Consultant",
    country: "Canada",
    region: "North America",
    serviceType: "visa",
    commissionRate: 0.35, // 35%
    isActive: true,
    // ...
  },
  // ... more agents
];
```

### Email Configuration

Set up environment variables:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## 💼 Business Flow

### 1. **Client Submission**

- User fills out professional SOP form
- Selects country, service type, urgency
- Completes payment ($149-$299)

### 2. **Automatic Processing**

- System assigns agent based on country + service type
- Calculates commission (30-35% depending on service)
- Stores request with "assigned" status

### 3. **Email Notifications**

- **Agent Email**: Detailed client requirements, deadline, contact info
- **Client Email**: Confirmation with agent details, timeline, request ID

### 4. **Agent Work**

- Agent receives comprehensive client briefing
- Creates SOP according to country requirements
- Submits completed work (status: "completed")

### 5. **Admin Review & Payout**

- Admin reviews completed requests
- Processes agent payouts through dashboard
- System sends payout confirmation emails

## 📊 Agent Performance Tracking

### Metrics Tracked:

- **Total Earnings**: Cumulative commission payments
- **Completed Orders**: Number of successfully delivered SOPs
- **Average Earnings**: Per-order average commission
- **Join Date**: When agent started
- **Specialization**: Country and service expertise

### Admin Analytics:

- Pending payout amounts and agent counts
- Monthly payout totals
- Overall platform earnings
- Active agent count

## 🚀 Features in Development

### Payment Integration

- **Stripe Integration**: Real-time payment processing
- **Multiple Payment Methods**: Credit cards, PayPal, bank transfers
- **Automatic Refunds**: For failed or cancelled requests

### Advanced Features

- **Agent Rating System**: Client feedback and performance scoring
- **Automated Quality Control**: SOP review and approval workflows
- **Client Communication Portal**: Direct messaging with assigned agents
- **Mobile App**: iOS/Android apps for agents and admins

## 📁 File Structure

```
app/
├── admin/page.tsx                      # Admin dashboard
├── professional-sop/page.tsx          # Professional SOP form
├── api/
│   ├── submit-sop-request/route.ts     # SOP submission endpoint
│   ├── assign-agent/route.ts           # Agent assignment API
│   ├── agent-payout/route.ts           # Payout management API
│   └── send-email/route.ts             # Email service API

components/
├── professional-sop-form.tsx          # Multi-step SOP form
├── enhanced-country-selector.tsx      # Advanced country picker
├── enhanced-admin-dashboard.tsx       # Admin management interface
├── professional-services-section.tsx  # Services showcase
└── payment-component.tsx              # Payment processing UI

lib/
├── agent-assignment.ts                 # Agent management logic
├── country-utils.ts                    # Country data and utilities
└── email-service.ts                    # Email templates and sending
```

## 🎯 Getting Started

1. **Install Dependencies**

```bash
npm install
```

2. **Set Up Environment Variables**

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
OPENAI_API_KEY=your-openai-key
```

3. **Run Development Server**

```bash
npm run dev
```

4. **Access Features**

- Professional SOP Form: `http://localhost:3000/professional-sop`
- Admin Dashboard: `http://localhost:3000/admin`
- Main Platform: `http://localhost:3000`

## 💡 Usage Examples

### Order Professional SOP

1. Visit `/professional-sop`
2. Fill out 3-step form (personal info, education, statement details)
3. Select country with agent support
4. Choose service type (admission/visa)
5. Complete payment
6. Receive confirmation with agent assignment

### Manage Payouts (Admin)

1. Visit `/admin`
2. Navigate to "Pending Payouts" tab
3. Review agent commissions and completed requests
4. Process payments with one click
5. Agent receives automated payout notification

### Agent Assignment (Automatic)

```typescript
// Example: Canadian visa SOP request
const sopRequest = createSOPRequest(
  {
    email: "student@example.com",
    name: "John Doe",
    country: "Canada",
    serviceType: "visa",
  },
  149
);

// Returns assigned agent: Michael Chen (IRCC-Certified Immigration Consultant)
// Commission: $52.15 (35% of $149)
```

This system provides a complete end-to-end solution for visa agent partnerships with automated workflows, professional email handling, and comprehensive admin management tools.
