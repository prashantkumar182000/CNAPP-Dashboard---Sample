// src/store.js
import { create } from 'zustand';

export const useStore = create((set) => ({
  categories: [
    {
      id: 1,
      name: 'CSPM Executive Dashboard',
      widgets: [
        { id: 1, name: 'Cloud Accounts', text: 'Connected: 2, Not Connected: 2' },
        { 
          id: 2, 
          name: 'Cloud Account Risk Assessment', 
          text: 'Failed: 89, Warning: 10, Not Available: 30, Passed: 72' 
        },
      ],
    },
    {
      id: 2,
      name: 'CWPP Dashboard',
      widgets: [
        {
          id: 5,
          name: 'Top 5 Namespace Specific Alerts',
          text: 'No Graph data available!',
        },
        {
          id: 6,
          name: 'Workload Alerts',
          text: 'No Graph data available!',
        },
      ],
    },
    {
      id: 3,
      name: 'Registry Scan',
      widgets: [
        { id: 3, name: 'Image Risk Assessment', text: 'Critical: 98, High: 100, Medium: 200, Low: 300' },
        { id: 4, name: 'Image Security Issues', text: 'Critical: 1, High: 2, Medium: 3, Low: 4' },
      ],
    },
  ],
  addWidget: (categoryId, widget) => set((state) => ({
    categories: state.categories.map((category) =>
      category.id === categoryId
        ? { ...category, widgets: [...category.widgets, widget] }
        : category
    ),
  })),
  removeWidget: (categoryId, widgetId) => set((state) => ({
    categories: state.categories.map((category) =>
      category.id === categoryId
        ? { ...category, widgets: category.widgets.filter((widget) => widget.id !== widgetId) }
        : category
    ),
  })),
}));