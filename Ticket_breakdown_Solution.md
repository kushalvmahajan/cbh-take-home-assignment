## Ticket 1: Add Custom ID Field to Agents Table

### Description

Add a new field to the Agents table to store a custom ID chosen by the Facility.

### Acceptance Criteria

- A new column called "custom_id" is added to the Agents table in the database
- The column is of type VARCHAR and has a maximum length of 50 characters
- The custom ID can be set and updated by the Facility through the UI
- The custom ID is displayed in the Facility's view of Agents

### Time/Effort Estimate

2-3 hours

### Implementation Details

1.  Modify the Agents table in the database to include the new column
2.  Add a form field for custom ID to the Facility's UI for creating and editing Agents
3.  Update the backend API to handle creating and updating Agents with a custom ID
4.  Update the frontend UI to display the custom ID in the Facility's view of Agents

## Ticket 2: Update Shifts API to Include Custom Agent ID

### Description

Modify the `getShiftsByFacility` function to include the custom ID of the Agent assigned to each Shift in its response.

### Acceptance Criteria

- The `getShiftsByFacility` function returns an array of Shift objects that include the custom ID of the Agent assigned to each Shift.

### Time/Effort Estimate

1-2 hours

### Implementation Details

1.  Add a join to the Agents table to the `getShiftsByFacility` function to include the custom ID of the Agent assigned to each Shift in the response

## Ticket 3: Use Custom ID in Generated Reports

### Description

Modify the `generateReport` function to use the custom ID of the Agent assigned to each Shift when generating the report.

### Acceptance Criteria

- The `generateReport` function generates a PDF report that displays the custom ID of the Agent assigned to each Shift.

### Time/Effort Estimate

3-4 hours

### Implementation Details

1.  Modify the `generateReport` function to include the custom ID of the Agent assigned to each Shift in the generated report
2.  Add a new configuration option to the `generateReport` function to allow the Facility to choose whether to display the custom ID or the internal database ID of the Agent in the generated report
3.  Update the frontend UI to allow the Facility to select the configuration option for each report they generate.
