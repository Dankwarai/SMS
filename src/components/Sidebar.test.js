
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderSidebar } from './Sidebar';

// Mock localStorage
const localStorageMock = (() => {
    let store = {};
    return {
        getItem: (key) => store[key] || null,
        setItem: (key, value) => { store[key] = value.toString(); },
        clear: () => { store = {}; }
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
});

describe('Sidebar Component', () => {
    beforeEach(() => {
        window.localStorage.clear();
        document.body.innerHTML = '';
    });

    it('renders all links for admin', () => {
        window.localStorage.setItem('sms-role', 'admin');
        const sidebar = renderSidebar();
        document.body.appendChild(sidebar);

        expect(document.body.textContent).toContain('Dashboard');
        expect(document.body.textContent).toContain('Students');
        expect(document.body.textContent).toContain('Teachers');
        expect(document.body.textContent).toContain('Finance');
        expect(document.body.textContent).toContain('Settings');
    });

    it('hides Finance and Teachers for teacher role', () => {
        window.localStorage.setItem('sms-role', 'teacher');
        const sidebar = renderSidebar();
        document.body.appendChild(sidebar);

        const links = Array.from(sidebar.querySelectorAll('.nav-link'));
        const visibleLinks = links.filter(link => link.style.display !== 'none')
            .map(link => link.textContent.trim());

        // Check that Finance and Teachers are NOT in visible links
        // Note: textContent includes the icon, so we check for inclusion
        const linkTexts = visibleLinks.join(' ');
        expect(linkTexts).not.toContain('Finance');
        expect(linkTexts).not.toContain('Teachers');
        expect(linkTexts).toContain('Dashboard');
    });

    it('hides Finance, Teachers, and Students for student role', () => {
        window.localStorage.setItem('sms-role', 'student');
        const sidebar = renderSidebar();
        document.body.appendChild(sidebar);

        const links = Array.from(sidebar.querySelectorAll('.nav-link'));
        const visibleLinks = links.filter(link => link.style.display !== 'none')
            .map(link => link.textContent.trim());

        const linkTexts = visibleLinks.join(' ');
        expect(linkTexts).not.toContain('Finance');
        expect(linkTexts).not.toContain('Teachers');
        expect(linkTexts).not.toContain('Students');
        expect(linkTexts).toContain('Dashboard');
    });
});
