import React from 'react';
import CritterTable from './components/CritterTable';
import './App.css';
import 'react-virtualized/styles.css';

/**
 * TODO
 * Track caught
 * Show/Hide caught
 * Preview Month
 * All/Available/Expiring
 * Search
 * Sort
 * Text/Graph Time & Months Toggle
 * 12/24hr Toggle
 * Styling
 * BEM
 * variable conventions
 * Add insects
 * Toggle between bugs and insects
 * Show both bugs and insects
 * Mobile Responsive (Collapse columns, flex columns)
 * Mobile (control panel modal)
 * Mobile (preview modal)
 * Mobile (preview modal, swipe/ left right buttons to move through list)
 */
function App() {
  return (
    <div>
      <CritterTable />
    </div>
  );
}

export default App;
