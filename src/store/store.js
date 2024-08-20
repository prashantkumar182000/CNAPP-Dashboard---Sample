import { create } from 'zustand';

export const useStore = create((set) => ({
  categories: [
    {
      id: 1,
      name: 'CSPM Executive Dashboard',
      widgets: [
        { id: 1, name: 'Cloud Accounts', text: 'Connected: 2, Not Connected: 2' },
        { id: 2, name: 'Cloud Account Risk Assessment', text: 'Failed: 1689, Passed: 7251' },
      ],
    },
    {
      id: 2,
      name: 'CWPP Dashboard',
      widgets: [],
    },
    {
      id: 3,
      name: 'Registry Scan',
      widgets: [
        { id: 3, name: 'Image Risk Assessment', text: 'Total Vulnerabilities: 1470, Critical: 98' },
        { id: 4, name: 'Image Security Issues', text: 'Total Images: 2, Critical: 1' },
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
