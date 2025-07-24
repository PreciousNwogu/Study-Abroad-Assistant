// Agent assignment logic for Study Abroad Assistant
// Assigns orders to the right specialist based on country and service type

interface AgentAssignment {
  id: string;
  email: string;
  name: string;
  specialty: string;
  country: string;
  region: string;
  serviceType: "admission" | "visa";
  commissionRate: number; // Percentage (e.g., 0.3 for 30%)
  isActive: boolean;
  joinDate: string;
  totalEarnings: number;
  completedOrders: number;
}

interface SOPRequest {
  id: string;
  clientEmail: string;
  clientName: string;
  country: string;
  serviceType: "admission" | "visa";
  amount: number;
  agentId: string;
  agentCommission: number;
  status: "pending" | "assigned" | "in_progress" | "completed" | "delivered";
  requestDate: string;
  assignedDate?: string;
  completedDate?: string;
  deliveredDate?: string;
  sopContent?: string;
}

const agents: AgentAssignment[] = [
  // North America - Canada
  {
    id: "CA_ADM_001",
    email: "sarah.thompson@studyabroadassistant.com",
    name: "Sarah Thompson",
    specialty: "Canadian University Admissions Expert",
    country: "Canada",
    region: "North America",
    serviceType: "admission",
    commissionRate: 0.3,
    isActive: true,
    joinDate: "2024-01-15",
    totalEarnings: 2450.0,
    completedOrders: 18,
  },
  {
    id: "CA_VISA_001",
    email: "michael.chen@studyabroadassistant.com",
    name: "Michael Chen",
    specialty: "IRCC-Certified Immigration Consultant",
    country: "Canada",
    region: "North America",
    serviceType: "visa",
    commissionRate: 0.35,
    isActive: true,
    joinDate: "2024-01-20",
    totalEarnings: 3150.0,
    completedOrders: 22,
  },

  // Europe - UK
  {
    id: "UK_ADM_001",
    email: "emma.williams@studyabroadassistant.com",
    name: "Emma Williams",
    specialty: "UK Admissions & UCAS Expert",
    country: "UK",
    region: "Europe",
    serviceType: "admission",
    commissionRate: 0.3,
    isActive: true,
    joinDate: "2024-02-01",
    totalEarnings: 1890.0,
    completedOrders: 14,
  },
  {
    id: "UK_VISA_001",
    email: "james.morrison@studyabroadassistant.com",
    name: "James Morrison",
    specialty: "Immigration Solicitor & Home Office Specialist",
    country: "UK",
    region: "Europe",
    serviceType: "visa",
    commissionRate: 0.35,
    isActive: true,
    joinDate: "2024-02-10",
    totalEarnings: 2280.0,
    completedOrders: 16,
  },

  // Europe - Germany
  {
    id: "DE_ADM_001",
    email: "hans.mueller@studyabroadassistant.com",
    name: "Hans Mueller",
    specialty: "German University Admissions Specialist",
    country: "Germany",
    region: "Europe",
    serviceType: "admission",
    commissionRate: 0.3,
    isActive: true,
    joinDate: "2024-03-01",
    totalEarnings: 1200.0,
    completedOrders: 9,
  },
  {
    id: "DE_VISA_001",
    email: "petra.wagner@studyabroadassistant.com",
    name: "Petra Wagner",
    specialty: "German Student Visa Expert",
    country: "Germany",
    region: "Europe",
    serviceType: "visa",
    commissionRate: 0.35,
    isActive: true,
    joinDate: "2024-03-05",
    totalEarnings: 1580.0,
    completedOrders: 11,
  },

  // Oceania - Australia
  {
    id: "AU_ADM_001",
    email: "jessica.cooper@studyabroadassistant.com",
    name: "Jessica Cooper",
    specialty: "Australian Universities Admission Expert",
    country: "Australia",
    region: "Oceania",
    serviceType: "admission",
    commissionRate: 0.3,
    isActive: true,
    joinDate: "2024-02-15",
    totalEarnings: 1650.0,
    completedOrders: 12,
  },
  {
    id: "AU_VISA_001",
    email: "david.mitchell@studyabroadassistant.com",
    name: "David Mitchell",
    specialty: "Australian Student Visa Consultant",
    country: "Australia",
    region: "Oceania",
    serviceType: "visa",
    commissionRate: 0.35,
    isActive: true,
    joinDate: "2024-02-20",
    totalEarnings: 2100.0,
    completedOrders: 15,
  },

  // North America - USA
  {
    id: "US_ADM_001",
    email: "jennifer.davis@studyabroadassistant.com",
    name: "Jennifer Davis",
    specialty: "US University Admissions Counselor",
    country: "USA",
    region: "North America",
    serviceType: "admission",
    commissionRate: 0.3,
    isActive: true,
    joinDate: "2024-03-10",
    totalEarnings: 980.0,
    completedOrders: 7,
  },
  {
    id: "US_VISA_001",
    email: "robert.johnson@studyabroadassistant.com",
    name: "Robert Johnson",
    specialty: "US Student Visa & F-1 Expert",
    country: "USA",
    region: "North America",
    serviceType: "visa",
    commissionRate: 0.35,
    isActive: true,
    joinDate: "2024-03-15",
    totalEarnings: 1260.0,
    completedOrders: 9,
  },

  // Immigration SOP Specialists - Global Coverage
  {
    id: "IMMIG_001",
    email: "nicolekennedy308@gmail.com",
    name: "Nicole Kennedy",
    specialty: "Immigration SOP & Visa Application Specialist",
    country: "Global",
    region: "Global",
    serviceType: "visa",
    commissionRate: 0.4,
    isActive: true,
    joinDate: "2024-12-15",
    totalEarnings: 0.0,
    completedOrders: 0,
  },
  {
    id: "IMMIG_002",
    email: "nwoguprecious400@gmail.com",
    name: "Precious Nwogu",
    specialty: "Immigration SOP & Study Permit Expert",
    country: "Global",
    region: "Global",
    serviceType: "visa",
    commissionRate: 0.4,
    isActive: true,
    joinDate: "2024-12-15",
    totalEarnings: 0.0,
    completedOrders: 0,
  },
  {
    id: "IMMIG_003",
    email: "dabereprecious01@gmail.com",
    name: "Precious Dabere",
    specialty: "Immigration Documentation & SOP Writer",
    country: "Global",
    region: "Global",
    serviceType: "visa",
    commissionRate: 0.4,
    isActive: true,
    joinDate: "2024-12-15",
    totalEarnings: 0.0,
    completedOrders: 0,
  },
];

export function assignToAgent(
  serviceType: "admission" | "visa",
  country: string
): AgentAssignment | null {
  // For visa/immigration services, prioritize the new immigration specialists
  if (serviceType === "visa") {
    // Get immigration specialists first
    const immigrationAgents = agents.filter(
      (agent) =>
        agent.serviceType === "visa" &&
        agent.country === "Global" &&
        agent.isActive &&
        agent.id.startsWith("IMMIG_")
    );

    if (immigrationAgents.length > 0) {
      // Round-robin assignment based on completed orders
      const leastBusyAgent = immigrationAgents.reduce((prev, current) =>
        prev.completedOrders <= current.completedOrders ? prev : current
      );

      console.log(
        `Assigned to Immigration Specialist: ${leastBusyAgent.name} (${leastBusyAgent.email}) - ${leastBusyAgent.specialty}`
      );
      return leastBusyAgent;
    }
  }

  // Find the right agent based on service type and country (original logic)
  const agent = agents.find(
    (agent) =>
      agent.serviceType === serviceType &&
      agent.country === country &&
      agent.isActive
  );

  if (!agent) {
    console.error(
      `No active agent found for ${serviceType} service in ${country}`
    );
    return null;
  }

  console.log(
    `Assigned to: ${agent.name} (${agent.email}) - ${agent.specialty}`
  );
  return agent;
}

export function calculateCommission(
  amount: number,
  commissionRate: number
): number {
  return Math.round(amount * commissionRate * 100) / 100;
}

export function createSOPRequest(
  clientData: {
    email: string;
    name: string;
    country: string;
    serviceType: "admission" | "visa";
  },
  amount: number = 149
): SOPRequest | null {
  const agent = assignToAgent(clientData.serviceType, clientData.country);
  if (!agent) return null;

  const agentCommission = calculateCommission(amount, agent.commissionRate);

  return {
    id: `SOP_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    clientEmail: clientData.email,
    clientName: clientData.name,
    country: clientData.country,
    serviceType: clientData.serviceType,
    amount,
    agentId: agent.id,
    agentCommission,
    status: "pending",
    requestDate: new Date().toISOString(),
  };
}

export function getAgentByService(
  serviceType: "admission" | "visa",
  country: string
) {
  return assignToAgent(serviceType, country);
}

export function getAgentById(agentId: string): AgentAssignment | null {
  return agents.find((agent) => agent.id === agentId) || null;
}

export function getAgentsByRegion(region: string): AgentAssignment[] {
  return agents.filter((agent) => agent.region === region && agent.isActive);
}

export function getAllActiveAgents(): AgentAssignment[] {
  return agents.filter((agent) => agent.isActive);
}

export function getAgentStats(agentId: string) {
  const agent = getAgentById(agentId);
  if (!agent) return null;

  return {
    id: agent.id,
    name: agent.name,
    email: agent.email,
    totalEarnings: agent.totalEarnings,
    completedOrders: agent.completedOrders,
    commissionRate: agent.commissionRate,
    avgEarningsPerOrder:
      agent.completedOrders > 0
        ? Math.round((agent.totalEarnings / agent.completedOrders) * 100) / 100
        : 0,
    joinDate: agent.joinDate,
    specialty: agent.specialty,
    country: agent.country,
    region: agent.region,
  };
}

// In-memory storage for SOP requests (in production, use a database)
let sopRequests: SOPRequest[] = [];

export function addSOPRequest(request: SOPRequest): void {
  sopRequests.push(request);
}

export function getSOPRequestById(id: string): SOPRequest | null {
  return sopRequests.find((req) => req.id === id) || null;
}

export function updateSOPRequestStatus(
  id: string,
  status: SOPRequest["status"],
  sopContent?: string
): boolean {
  const requestIndex = sopRequests.findIndex((req) => req.id === id);
  if (requestIndex === -1) return false;

  sopRequests[requestIndex].status = status;

  if (status === "assigned") {
    sopRequests[requestIndex].assignedDate = new Date().toISOString();
  } else if (status === "completed") {
    sopRequests[requestIndex].completedDate = new Date().toISOString();
    if (sopContent) {
      sopRequests[requestIndex].sopContent = sopContent;
    }
  } else if (status === "delivered") {
    sopRequests[requestIndex].deliveredDate = new Date().toISOString();
  }

  return true;
}

export function getSOPRequestsByAgent(agentId: string): SOPRequest[] {
  return sopRequests.filter((req) => req.agentId === agentId);
}

export function getSOPRequestsByStatus(
  status: SOPRequest["status"]
): SOPRequest[] {
  return sopRequests.filter((req) => req.status === status);
}

export function getPendingPayouts(): Array<{
  agent: AgentAssignment;
  pendingCommission: number;
  completedRequests: SOPRequest[];
}> {
  const completedRequests = sopRequests.filter(
    (req) => req.status === "completed" || req.status === "delivered"
  );

  const agentPayouts = new Map<
    string,
    {
      agent: AgentAssignment;
      pendingCommission: number;
      completedRequests: SOPRequest[];
    }
  >();

  completedRequests.forEach((request) => {
    const agent = getAgentById(request.agentId);
    if (!agent) return;

    if (!agentPayouts.has(agent.id)) {
      agentPayouts.set(agent.id, {
        agent,
        pendingCommission: 0,
        completedRequests: [],
      });
    }

    const payout = agentPayouts.get(agent.id)!;
    payout.pendingCommission += request.agentCommission;
    payout.completedRequests.push(request);
  });

  return Array.from(agentPayouts.values());
}

// Usage examples:
// assignToAgent('admission', 'Canada') -> Sarah Thompson
// assignToAgent('visa', 'Canada') -> Michael Chen
// assignToAgent('admission', 'UK') -> Emma Williams
// assignToAgent('visa', 'UK') -> James Morrison

export { agents, sopRequests };
export type { AgentAssignment, SOPRequest };
