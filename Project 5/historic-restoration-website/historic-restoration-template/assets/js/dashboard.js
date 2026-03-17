/**
 * Dashboard JavaScript
 * Historic Preservation & Restoration Contractor
 * 
 * Client portal logic, timeline visualization, and interactive features
 */

// ============================================================================
// DASHBOARD INITIALIZATION
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  if (!document.getElementById('dashboard')) return;
  
  initDashboardSidebar();
  initProjectTimeline();
  initDocumentLibrary();
  initApprovalCards();
  initProgressBars();
  loadDashboardData();
});

// ============================================================================
// DASHBOARD SIDEBAR
// ============================================================================

function initDashboardSidebar() {
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  const contentSections = document.querySelectorAll('.content-section');
  
  sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = link.getAttribute('data-section');
      
      // Update active link
      sidebarLinks.forEach(l => l.classList.remove('active', 'bg-primary/10', 'text-primary', 'border-primary'));
      link.classList.add('active', 'bg-primary/10', 'text-primary', 'border-primary');
      
      // Show target section
      contentSections.forEach(section => {
        if (section.id === targetId) {
          section.classList.remove('hidden');
          section.classList.add('fade-in-up');
        } else {
          section.classList.add('hidden');
        }
      });
    });
  });
}

// ============================================================================
// PROJECT TIMELINE
// ============================================================================

function initProjectTimeline() {
  const timelineData = [
    {
      phase: 'Initial Assessment',
      status: 'completed',
      startDate: '2024-01-15',
      endDate: '2024-02-01',
      progress: 100,
      tasks: [
        { name: 'Site inspection', completed: true },
        { name: 'Structural analysis', completed: true },
        { name: 'Historical research', completed: true }
      ]
    },
    {
      phase: 'Design & Planning',
      status: 'completed',
      startDate: '2024-02-05',
      endDate: '2024-03-15',
      progress: 100,
      tasks: [
        { name: 'Architectural plans', completed: true },
        { name: 'Material sourcing', completed: true },
        { name: 'Permit applications', completed: true }
      ]
    },
    {
      phase: 'Foundation Restoration',
      status: 'active',
      startDate: '2024-03-20',
      endDate: '2024-05-10',
      progress: 65,
      tasks: [
        { name: 'Excavation', completed: true },
        { name: 'Structural reinforcement', completed: true },
        { name: 'Waterproofing', completed: false }
      ]
    },
    {
      phase: 'Masonry Work',
      status: 'pending',
      startDate: '2024-05-15',
      endDate: '2024-07-30',
      progress: 0,
      tasks: [
        { name: 'Brick restoration', completed: false },
        { name: 'Mortar repointing', completed: false },
        { name: 'Stone cleaning', completed: false }
      ]
    },
    {
      phase: 'Interior Restoration',
      status: 'pending',
      startDate: '2024-08-01',
      endDate: '2024-10-15',
      progress: 0,
      tasks: [
        { name: 'Woodwork restoration', completed: false },
        { name: 'Plaster repair', completed: false },
        { name: 'Floor refinishing', completed: false }
      ]
    }
  ];
  
  renderTimeline(timelineData);
}

function renderTimeline(data) {
  const timelineContainer = document.getElementById('project-timeline');
  if (!timelineContainer) return;
  
  timelineContainer.innerHTML = data.map((phase, index) => `
    <div class="timeline-step ${phase.status} mb-8">
      <div class="bg-surface dark:bg-surface p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="text-xl font-display font-semibold mb-2">${phase.phase}</h3>
            <p class="text-sm text-tertiary">
              ${formatTimelineDate(phase.startDate)} - ${formatTimelineDate(phase.endDate)}
            </p>
          </div>
          <span class="badge badge-${getBadgeType(phase.status)}">${phase.status}</span>
        </div>
        
        <div class="mb-4">
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm font-medium">Progress</span>
            <span class="text-sm font-semibold text-primary">${phase.progress}%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${phase.progress}%"></div>
          </div>
        </div>
        
        <div class="space-y-2">
          ${phase.tasks.map(task => `
            <div class="flex items-center gap-3 text-sm">
              <div class="w-5 h-5 rounded-full border-2 ${task.completed ? 'bg-primary border-primary' : 'border-border'} flex items-center justify-center">
                ${task.completed ? '<svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>' : ''}
              </div>
              <span class="${task.completed ? 'text-secondary' : 'text-primary'}">${task.name}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

function formatTimelineDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function getBadgeType(status) {
  const types = {
    'completed': 'success',
    'active': 'info',
    'pending': 'warning'
  };
  return types[status] || 'info';
}

// ============================================================================
// DOCUMENT LIBRARY
// ============================================================================

function initDocumentLibrary() {
  const documents = [
    {
      id: 1,
      name: 'Building Permit Application',
      type: 'PDF',
      size: '2.4 MB',
      date: '2024-02-10',
      category: 'Permits',
      status: 'approved'
    },
    {
      id: 2,
      name: 'Architectural Plans - Main Floor',
      type: 'PDF',
      size: '8.7 MB',
      date: '2024-02-28',
      category: 'Plans',
      status: 'approved'
    },
    {
      id: 3,
      name: 'Historical Survey Report',
      type: 'PDF',
      size: '5.2 MB',
      date: '2024-01-22',
      category: 'Research',
      status: 'approved'
    },
    {
      id: 4,
      name: 'Structural Engineering Report',
      type: 'PDF',
      size: '3.8 MB',
      date: '2024-02-15',
      category: 'Engineering',
      status: 'approved'
    },
    {
      id: 5,
      name: 'Material Specifications',
      type: 'XLSX',
      size: '1.1 MB',
      date: '2024-03-05',
      category: 'Specifications',
      status: 'approved'
    },
    {
      id: 6,
      name: 'Phase 3 Progress Photos',
      type: 'ZIP',
      size: '45.3 MB',
      date: '2024-04-12',
      category: 'Photos',
      status: 'new'
    }
  ];
  
  renderDocumentLibrary(documents);
}

function renderDocumentLibrary(documents) {
  const libraryContainer = document.getElementById('document-library');
  if (!libraryContainer) return;
  
  libraryContainer.innerHTML = `
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-surface-elevated dark:bg-surface-elevated border-b border-border">
          <tr>
            <th class="px-6 py-4 text-left text-sm font-semibold">Document Name</th>
            <th class="px-6 py-4 text-left text-sm font-semibold">Category</th>
            <th class="px-6 py-4 text-left text-sm font-semibold">Type</th>
            <th class="px-6 py-4 text-left text-sm font-semibold">Size</th>
            <th class="px-6 py-4 text-left text-sm font-semibold">Date</th>
            <th class="px-6 py-4 text-left text-sm font-semibold">Status</th>
            <th class="px-6 py-4 text-left text-sm font-semibold">Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-border">
          ${documents.map(doc => `
            <tr class="hover:bg-surface-elevated transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <span class="font-medium">${doc.name}</span>
                </div>
              </td>
              <td class="px-6 py-4 text-secondary">${doc.category}</td>
              <td class="px-6 py-4">
                <span class="badge badge-info">${doc.type}</span>
              </td>
              <td class="px-6 py-4 text-tertiary">${doc.size}</td>
              <td class="px-6 py-4 text-tertiary">${formatTimelineDate(doc.date)}</td>
              <td class="px-6 py-4">
                <span class="badge badge-${doc.status === 'new' ? 'warning' : 'success'}">
                  ${doc.status}
                </span>
              </td>
              <td class="px-6 py-4">
                <button onclick="downloadDocument(${doc.id})" class="p-2 hover:bg-primary/10 rounded-lg transition-colors group">
                  <svg class="w-5 h-5 text-secondary group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                  </svg>
                </button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

// ============================================================================
// APPROVAL CARDS
// ============================================================================

function initApprovalCards() {
  const approvals = [
    {
      id: 1,
      title: 'Foundation Restoration - Phase Completion',
      description: 'The foundation restoration phase has been completed. Please review the work and approve to proceed with masonry work.',
      date: '2024-04-15',
      priority: 'high',
      attachments: 3
    },
    {
      id: 2,
      title: 'Material Change Request - Roofing Tiles',
      description: 'Due to availability issues, we recommend switching to authentic reclaimed tiles from a verified historic supplier.',
      date: '2024-04-10',
      priority: 'medium',
      attachments: 2
    }
  ];
  
  renderApprovalCards(approvals);
}

function renderApprovalCards(approvals) {
  const approvalsContainer = document.getElementById('approval-cards');
  if (!approvalsContainer) return;
  
  approvalsContainer.innerHTML = approvals.map(approval => `
    <div class="bg-surface dark:bg-surface rounded-xl p-6 shadow-md border-l-4 ${approval.priority === 'high' ? 'border-error' : 'border-warning'}">
      <div class="flex justify-between items-start mb-4">
        <div class="flex-1">
          <div class="flex items-center gap-3 mb-2">
            <h3 class="text-lg font-display font-semibold">${approval.title}</h3>
            <span class="badge badge-${approval.priority === 'high' ? 'error' : 'warning'}">
              ${approval.priority} priority
            </span>
          </div>
          <p class="text-secondary text-sm mb-3">${approval.description}</p>
          <div class="flex items-center gap-4 text-sm text-tertiary">
            <span class="flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              ${formatTimelineDate(approval.date)}
            </span>
            <span class="flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/>
              </svg>
              ${approval.attachments} attachments
            </span>
          </div>
        </div>
      </div>
      
      <div class="flex gap-3">
        <button onclick="handleApproval(${approval.id}, 'approve')" class="btn-primary flex-1">
          <span class="flex items-center justify-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            Approve
          </span>
        </button>
        <button onclick="handleApproval(${approval.id}, 'reject')" class="btn-secondary flex-1">
          <span class="flex items-center justify-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
            Request Changes
          </span>
        </button>
      </div>
    </div>
  `).join('');
}

// ============================================================================
// PROGRESS BARS
// ============================================================================

function initProgressBars() {
  const progressBars = document.querySelectorAll('.progress-fill');
  
  // Animate progress bars on load
  setTimeout(() => {
    progressBars.forEach(bar => {
      const targetWidth = bar.style.width;
      bar.style.width = '0%';
      setTimeout(() => {
        bar.style.width = targetWidth;
      }, 100);
    });
  }, 500);
}

// ============================================================================
// LOAD DASHBOARD DATA
// ============================================================================

function loadDashboardData() {
  // Simulate loading dashboard statistics
  const stats = {
    projectProgress: 45,
    completedPhases: 2,
    totalPhases: 5,
    daysRemaining: 145,
    budgetUsed: 62
  };
  
  updateDashboardStats(stats);
}

function updateDashboardStats(stats) {
  const elements = {
    projectProgress: document.getElementById('project-progress'),
    completedPhases: document.getElementById('completed-phases'),
    totalPhases: document.getElementById('total-phases'),
    daysRemaining: document.getElementById('days-remaining'),
    budgetUsed: document.getElementById('budget-used')
  };
  
  Object.keys(elements).forEach(key => {
    if (elements[key]) {
      elements[key].textContent = stats[key];
    }
  });
}

// ============================================================================
// ACTION HANDLERS
// ============================================================================

function downloadDocument(docId) {
  console.log(`Downloading document ${docId}`);
  
  // Simulate download
  const notification = document.createElement('div');
  notification.className = 'fixed top-4 right-4 bg-success text-white px-6 py-3 rounded-lg shadow-lg z-50';
  notification.textContent = 'Download started...';
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

function handleApproval(approvalId, action) {
  console.log(`Approval ${approvalId}: ${action}`);
  
  const message = action === 'approve' 
    ? 'Approval submitted successfully!' 
    : 'Change request submitted. The team will contact you shortly.';
  
  const notification = document.createElement('div');
  notification.className = `fixed top-4 right-4 ${action === 'approve' ? 'bg-success' : 'bg-warning'} text-white px-6 py-3 rounded-lg shadow-lg z-50`;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
  
  // Remove the approval card
  const card = document.querySelector(`[onclick*="${approvalId}"]`).closest('.bg-surface');
  if (card) {
    card.style.opacity = '0';
    card.style.transform = 'translateX(100%)';
    setTimeout(() => card.remove(), 300);
  }
}

// Make functions globally available
window.downloadDocument = downloadDocument;
window.handleApproval = handleApproval;

console.log('📊 Dashboard - Initialized');
