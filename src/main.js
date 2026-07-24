import './styles/index.css';
import './styles/components.css';
import './styles/landing.css';

import { renderSidebar } from './components/Sidebar.js';
import { renderHeader } from './components/Header.js';
import { renderDashboard } from './components/Dashboard.js';
import { renderExamList } from './components/CBT/ExamList.js';
import { renderExamInterface } from './components/CBT/ExamInterface.js';
import { renderExamResult } from './components/CBT/ExamResult.js';
import { renderExamCreation } from './components/CBT/ExamCreation.js';
import { renderStudentList } from './components/Students/StudentList.js';
import { renderAdmissionForm } from './components/Students/AdmissionForm.js';
import { renderStudentProfile } from './components/Students/StudentProfile.js';
import { renderTeacherList } from './components/Teachers/TeacherList.js';
import { renderFinanceDashboard } from './components/Finance/FinanceDashboard.js';
import { renderFeeCollection } from './components/Finance/FeeCollection.js';
import { renderTransactions } from './components/Finance/Transactions.js';
import { renderSettings } from './components/Settings/Settings.js';
import { renderLibrary } from './components/Library/Library.js';
import { renderTransport } from './components/Transport/Transport.js';
import { renderChat } from './components/Chat/Chat.js';
import { renderCourseList } from './components/Courses/CourseList.js';
import { renderCourseDetail } from './components/Courses/CourseDetail.js';
import { renderLanding } from './components/Landing/Landing.js';
import { renderRegister } from './components/Auth/Register.js';
import { renderLogin } from './components/Auth/Login.js';
import { renderStudentDashboard } from './components/Dashboards/StudentDashboard.js';
import { renderTeacherDashboard } from './components/Dashboards/TeacherDashboard.js';
import { renderTimetable } from './components/Timetable/Timetable.js';
import { renderAttendance } from './components/Attendance/Attendance.js';
import { renderGradebook } from './components/Academics/Gradebook.js';
import { renderParentPortal } from './components/Portal/ParentPortal.js';
import { renderTeacherForm } from './components/Teachers/TeacherForm.js';
import { renderSchoolCalendar } from './components/Calendar/SchoolCalendar.js';
import { renderAnalytics } from './components/CBT/Analytics.js';
import { renderAIInsights } from './components/AI/AIInsights.js';

// ... (other imports)

// Navigation Handler
document.addEventListener('navigate', (e) => {
    const contentArea = document.querySelector('#content-area');
    if (!contentArea) return; // Ignore if not in dashboard mode

    const view = e.detail.view;
    contentArea.innerHTML = '';

    if (view === 'Dashboard') {
        const role = localStorage.getItem('sms-role') || 'admin';
        if (role === 'student') {
            contentArea.appendChild(renderStudentDashboard());
        } else if (role === 'teacher') {
            contentArea.appendChild(renderTeacherDashboard());
        } else {
            contentArea.appendChild(renderDashboard());
        }
    } else if (view === 'AIInsights') {
        contentArea.appendChild(renderAIInsights());
    } else if (view === 'Register') {
        contentArea.appendChild(renderRegister(handleRegisterSuccess, handleNavigateLogin));
    } else if (view === 'Login') {
        contentArea.appendChild(renderLogin(handleLoginSuccess, handleNavigateRegister));
    } else if (view === 'Exams') {
        contentArea.appendChild(renderExamList(handleStartExam));
    } else if (view === 'CreateExam') {
        contentArea.appendChild(renderExamCreation(handleBackToExams));
    } else if (view === 'Students') {
        contentArea.appendChild(renderStudentList(handleNewAdmission, handleViewProfile));
    } else if (view === 'Admission') {
        contentArea.appendChild(renderAdmissionForm(handleBackToStudents, handleBackToStudents));
    } else if (view === 'StudentProfile') {
        const id = e.detail.id;
        contentArea.appendChild(renderStudentProfile(id, handleBackToStudents));
    } else if (view === 'Teachers') {
        contentArea.appendChild(renderTeacherList(handleAddTeacher, handleViewTeacherProfile));
    } else if (view === 'AddTeacher') {
        contentArea.appendChild(renderAddTeacherForm(handleBackToTeachers, handleBackToTeachers));
    } else if (view === 'TeacherProfile') {
        const id = e.detail.id;
        contentArea.appendChild(renderTeacherProfile(id, handleBackToTeachers));
    } else if (view === 'Finance') {
        contentArea.appendChild(renderFinanceDashboard(handleCollectFee, handleViewTransactions));
    } else if (view === 'FeeCollection') {
        contentArea.appendChild(renderFeeCollection(handleBackToFinance, handleBackToFinance));
    } else if (view === 'Transactions') {
        contentArea.appendChild(renderTransactions(handleBackToFinance));
    } else if (view === 'Settings') {
        contentArea.appendChild(renderSettings());
    } else if (view === 'Library') {
        contentArea.appendChild(renderLibrary());
    } else if (view === 'Transport') {
        contentArea.appendChild(renderTransport());
    } else if (view === 'Messages') {
        contentArea.appendChild(renderChat());
    } else if (view === 'Timetable') {
        contentArea.appendChild(renderTimetable());
    } else if (view === 'Attendance') {
        contentArea.appendChild(renderAttendance());
    } else if (view === 'Gradebook') {
        contentArea.appendChild(renderGradebook());
    } else if (view === 'ParentPortal') {
        contentArea.appendChild(renderParentPortal());
    } else if (view === 'Calendar') {
        contentArea.appendChild(renderSchoolCalendar());
    } else if (view === 'Courses') {
        contentArea.appendChild(renderCourseList(handleViewCourse));
    } else if (view === 'CourseDetail') {
        const id = e.detail.id;
        contentArea.appendChild(renderCourseDetail(id, handleBackToCourses));
    } else {
        contentArea.innerHTML = `<div style="padding: 2rem;"><h1>${view}</h1><p class="text-muted">Coming Soon...</p></div>`;
    }
});

// --- Action Handlers ---

// CBT
function handleStartExam(examId) {
    const contentArea = document.querySelector('#content-area');
    contentArea.innerHTML = '';
    contentArea.appendChild(renderExamInterface(examId, handleSubmitExam));
}

function handleSubmitExam(answers, questions) {
    const contentArea = document.querySelector('#content-area');
    contentArea.innerHTML = '';
    contentArea.appendChild(renderExamResult(answers, questions, handleBackToExams));
}

function handleBackToExams() {
    const event = new CustomEvent('navigate', { detail: { view: 'Exams' } });
    document.dispatchEvent(event);
}

// Students
function handleNewAdmission() {
    const event = new CustomEvent('navigate', { detail: { view: 'Admission' } });
    document.dispatchEvent(event);
}

function handleBackToStudents() {
    const event = new CustomEvent('navigate', { detail: { view: 'Students' } });
    document.dispatchEvent(event);
}

function handleViewProfile(id) {
    const event = new CustomEvent('navigate', { detail: { view: 'StudentProfile', id: id } });
    document.dispatchEvent(event);
}

// Teachers
function handleAddTeacher() {
    const event = new CustomEvent('navigate', { detail: { view: 'AddTeacher' } });
    document.dispatchEvent(event);
}

function handleBackToTeachers() {
    const event = new CustomEvent('navigate', { detail: { view: 'Teachers' } });
    document.dispatchEvent(event);
}

function handleViewTeacherProfile(id) {
    const event = new CustomEvent('navigate', { detail: { view: 'TeacherProfile', id: id } });
    document.dispatchEvent(event);
}

// Finance
function handleCollectFee() {
    const event = new CustomEvent('navigate', { detail: { view: 'FeeCollection' } });
    document.dispatchEvent(event);
}

function handleViewTransactions() {
    const event = new CustomEvent('navigate', { detail: { view: 'Transactions' } });
    document.dispatchEvent(event);
}

function handleBackToFinance() {
    const event = new CustomEvent('navigate', { detail: { view: 'Finance' } });
    document.dispatchEvent(event);
}

// Courses
function handleViewCourse(id) {
    const event = new CustomEvent('navigate', { detail: { view: 'CourseDetail', id: id } });
    document.dispatchEvent(event);
}

function handleBackToCourses() {
    const event = new CustomEvent('navigate', { detail: { view: 'Courses' } });
    document.dispatchEvent(event);
}

// --- Auth & Init ---

function handleLoginSuccess(role) {
    localStorage.setItem('sms-role', role);
    renderAppLayout();
    const event = new CustomEvent('navigate', { detail: { view: 'Dashboard' } });
    document.dispatchEvent(event);
}

function handleRegisterSuccess(role) {
    localStorage.setItem('sms-role', role);
    renderAppLayout();
    const event = new CustomEvent('navigate', { detail: { view: 'Dashboard' } });
    document.dispatchEvent(event);
}

function handleNavigateLogin() {
    const app = document.getElementById('app');
    app.innerHTML = '';
    app.appendChild(renderLogin(handleLoginSuccess, handleNavigateRegister));
}

function handleNavigateRegister() {
    const app = document.getElementById('app');
    app.innerHTML = '';
    app.appendChild(renderRegister(handleRegisterSuccess, handleNavigateLogin));
}

export function handleLogout() {
    localStorage.removeItem('sms-role');
    const app = document.getElementById('app');
    app.innerHTML = '';
    app.appendChild(renderLanding(handleNavigateLogin));
}
window.handleLogout = handleLogout; // Expose to global scope for easy access

function renderAppLayout() {
    const app = document.getElementById('app');
    app.innerHTML = ''; // Clear app

    const sidebar = renderSidebar();
    const mainContent = document.createElement('main');
    mainContent.id = 'main-content';
    mainContent.className = 'main-content';

    const header = renderHeader();

    const contentArea = document.createElement('div');
    contentArea.id = 'content-area';

    // Assemble
    mainContent.appendChild(header);
    mainContent.appendChild(contentArea);

    app.appendChild(sidebar);
    app.appendChild(mainContent);
}

function init() {
    const app = document.getElementById('app');
    const role = localStorage.getItem('sms-role');

    if (role) {
        renderAppLayout();
        // Dispatch event after a small delay to ensure DOM is ready or just dispatch immediately
        setTimeout(() => {
            const event = new CustomEvent('navigate', { detail: { view: 'Dashboard' } });
            document.dispatchEvent(event);
        }, 0);
    } else {
        app.appendChild(renderLanding(handleNavigateLogin));
    }
}

// Start App
init();

