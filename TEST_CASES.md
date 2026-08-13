# Test Cases Specification

This document provides a detailed description of all automated scenarios for the API and UI components of the EasyRPA project.

---

## API TESTS
## 🔑 Feature: Node Management (Node CRUD & File Operations)

### TC-API-001
* **Title:** Successful creation of a new isolated node
* **Feature:** Node Management
* **Test Type:** API
* **Priority:** Critical
* **Tag:** `@smoke`
* **Preconditions:**
1.  The user has node CREATE permission.
* **Steps:**
1. Send a POST request to the `/api/v1/node` endpoint with a valid JSON body containing the unique name of the node (e.g., "Brand New Isolated Node").
2. Check the server response status code.
3. Check the response structure for the generated ID and a matching name.
* **Expected result:**
* The server returns a `200` status code.
* The `id` property is present in the response body.
* The `name` field in the response exactly matches the one sent in the request.


---

### TC-API-002
* **Title:** Getting detailed information about a node by its ID
* **Feature:** Node Management
* **Test Type:** API
* **Priority:** High
* **Tag:** `@smoke`
* **Preconditions:**
1. A node with a known ID and name has been previously created in the system.
2. The user has node READ permissions.
* **Steps:**
1. Send a GET request to the `/api/v1/node/{id}` endpoint.
2. Check the response status code.
3. Check the response body for a match between the ID and name of the pre-created node.
* **Expected result:**
* The server returns a status code of '200'.
* The returned object contains a valid 'id'.
* The 'name' field contains the exact value of created node.
---

### TC-API-003
* **Title:** Successful update of existing node fields
* **Feature:** Node Management
* **Test type:** API
* **Priority:** Medium
* **Tag:** `@regression`
* **Preconditions:**
1. A node with a known ID and has been pre-created in the system.
2. The user has UPDATE permission.
* **Steps:**
1. Generate a valid JSON payload with the updated node values except name.
2. Send a PUT request to `/api/v1/node/${id}` endpoint.
3. Check the response status code.
4. Verify that the node name has changed in the server response.
* **Expected result:**
* The server returns a status code of 200.
* The name field in the response has successfully changed to the new value from the payload. 

---

### TC-API-004
* **Title:** Delete a node and check if it is unavailable
* **Feature:** Node Management
* **Test Type:** API
* **Priority:** High
* **Tag:** `@regression`
* **Preconditions:**
1. A node with a known ID has been previously created in the system.
2. The user has node DELETE permission.
* **Steps:**
1. Send a DELETE request to `/api/v1/node/{id} ` endpoint.
2. Check the response status code for a successful deletion.
3. Send a repeat test GET request to retrieve data from the same node using the saved ID.
4. Check the response status code for reading the remote object.
* **Expected result:**
* The first delete request returns a status code of 200.
* A repeat read request for the remote node returns a status code of 403 (Access Denied/Object Hidden).


---

### TC-API-005
* **Title:** Download node parameters as a CSV file
* **Feature:** Node File Operations
* **Test Type:** API
* **Priority:** High
* **Tag:** `@regression`
* **Preconditions:**
1. A node with populated parameters exists in the system.
* **Steps:**
1. Send a GET request to the parameter download endpoint `/api/v1/node/{id}/params/download`.
2. Check the server response status code.
3. Check the response headers (`content-type`) for binary or CSV data type.
4. Extract the response body as a data buffer and verify that the file size is greater than 0 bytes.
5. Convert the buffer to a UTF-8 string and verify the presence of the basic CSV header structure (key and value fields).
* **Expected result:**
A CSV file is returned with key and value fields.
# API Test Cases: Node Controller

## TC_API_006: Retrieve Empty Logs for a Newly Created Node

* **Component:** Node Controller / Logs API
* **Priority:** Medium
* **Description:** Verify that requesting full logs for a newly created node returns an empty response body.

### Preconditions
1. A new node is successfully created in the system.
2. The node has no activity history (no logs generated yet). 
3. The client has permission to READ node logs.

### Execution Steps
1. Send an HTTP **GET** request to the full logs endpoint: `/api/v1/node/{id}/logs`.
2. Retrieve the response.

### Expected Result
1. The server response status code is **200 OK**.
2. The response body is an **empty string** (length is 0 after trimming whitespaces).

---

## TC_API_007: Retrieve Features List for a Node by ID

* **Component:** Node Controller / Features API
* **Priority:** Medium
* **Description:** Verify that requesting the features list for a valid node returns a non-empty array with the correct JSON schema and data types.

### Preconditions
1. An active node with populated features exists in the system.
2. The client has permission to READ node features.

### Execution Steps
1. Send an HTTP **GET** request to the features endpoint: `/api/v1/node/{id}/feature`.
2. Parse the response body as JSON.
3. Validate the object structure of the first item in the array.

### Expected Result
1. The server response status code is **200 OK**.
2. The response body is a **JSON array**.
3. The array is **not empty** (length is greater than 0).
4. The first object in the array contains the required properties with correct data types:
    * `id`: **Number**
    * `type`: **String**
    * `enabled`: **Boolean**
    * `uuid`: **String**


## 🔑 Feature: Automation Process (Create operations)

## TC-API-008: Successful creation of a new Automation Process
* **Feature:** Automation Process Management
* **Title:** Successful creation of a new Automation Process
* **Type:** API
* **Priority:** Critical
* **Tag:** `@smoke`

### Preconditions
* The user has Automation Process CREATE permission.

### Steps
1. Send a `POST` request to create an Automation Process with valid payload data.

### Expected Result
* [ ] Response status code is `200`.
* [ ] Response body contains an `"id"` property.
* [ ] The `"name"` in the response matches the payload name.

---

## TC-API-009: Cannot create an Automation Process with a duplicate name

* **Feature:** Automation Process Management
* **Title:** Cannot create an Automation Process with a duplicate name
* **Type:** API
* **Priority:** High
* **Tag:** `@smoke`

### Preconditions
* An Automation Process with the target name already exists.

### Steps
1. Send a `POST` request to create an Automation Process with the duplicate name.

### Expected Result
* [ ] Response status code is `400`.
* [ ] Response body contains the error message:
  ```text
  "Automation process with the same name already exists! Please, choose another name"
  ```
## 🔑 Feature: User Management
### TC-API-010: Successfully retrieve current user information

* **Feature:** User Management
* **Title:** Successfully retrieve current user information
* **Type:** API
* **Priority:** Critical
* **Tag:** `@smoke`

#### Preconditions:
* The user is authenticated.
* The environment variable `CLIENT_ID` is correctly configured.

#### Steps:
1. Send a **GET** request to `/api/v1/users/currentuser endpoint` endpoint.
2. Verify that the server response status code is `200 OK`.
3. Check the response body JSON schema for required fields and correct data types:
    - `username`: string
    - `id`: number
    - `firstName`: string
    - `lastName`: string
    - `email`: string
    - `groups`: array
4. Check that the value of the `username` field exactly matches the user's CLIENT_ID.

#### Expected Result:
* [x] The server returns a `200` status code.
* [x] The response JSON contains all mandatory profile fields with correct types.
* [x] The user identity (`username`) matches the authenticated client identifier.

## UI TESTS
## 🔑 Feature: Node Management (Node CRUD & File Operations)
### TC-UI-011
* **Title:** Successfully created a new node
* **Feature:** Node Management
* **Test Type:** UI
* **Priority:** Critical
* **Tag:** `@smoke`
* **Preconditions:**
1. The node list page is open.
* **Steps:**
1. Click 'Create New' button.
2. Fill in details form with valid data
3. Click "Create" button.
4. Compare filled in data with the data on the node page that opens after the step 3.
* **Expected result:**
* The node is successfully created.
* The actual parameters of the created node on the page completely match the values intered in the form. 

### TC-UI-012
* **Title:** Disable creating a duplicate node with an existing name
* **Feature:** Node Management
* **Test Type:** UI
* **Priority:** High
* **Tag:** `@regression`
* **Preconditions:**
1. A node with known has been created in the system.
2. The page with the list of nodes is open.
* **Steps:**
1. Generate data for the duplicate node using the name of the already created node.
2. Attempt to create a new node with this name using the "Create New" button.
3. Check if the warning notification appears on the page.
* Expected result:**
* A new node is not created.
* An error message is displayed: "A node with the same name already exists! Please choose another name."


### TC-UI-013
* **Title:** Successful update of existing node data
* **Feature:** Node Management
* **Test type:** UI
* **Priority:** High
* **Tag:** `@regression`
* **Preconditions:**
1. A node with known has been created in the system.
* **Steps:**
1. Open created node
2. Update any available field.
2. Click "Update" button.
3. Record should be successfully saved.

* **Expected result:**
* The node data is update successfully.
* The node parameters in the UI match new values. 

### TC-UI-014
* **Title:** Disable node updates if there are no changes in the form
* **Feature:** Node Management
* **Test Type:** UI
* **Priority:** Medium
* **Tag:** `@regression`
* **Preconditions:**
1. A node with known has been created in the system.
* **Steps:**
1. Open created node.
2. Try to click "Update" button.

* Expected result:**
* The "Update" button is disabled because no changes were made to the form fields.


### TC-UI-015
* **Title:** Successful node deletion via inline button in a table row
* **Feature:** Node Management
* **Test type:** UI
* **Priority:** High
* **Tag:** `@regression`
* **Preconditions:**
1. A node with known has been created in the system.
2. Node list page is opened.
* **Steps:**
1. Click delete icon in node's row in the table.
2. Click "Submit" in the confirmation window.
* **Expected result:**
* The node is removed from the list.
* The text "No Results Found" appears on the page.

### TC-UI-016
* **Title:** Successfully deleted a node by selecting a checkbox in the table
* **Feature:** Node Management
* **Test Type:** UI
* **Priority:** High
* **Tag:** `@regression`
* **Preconditions:**
1. A node with known has been created in the system.
2. Node list page is opened.
* **Steps:**
1. Click a checkbox in the node's row.
2. Click "Delete" button.
* **Expected Result:**
* The node is removed from the list.
* The text "No Results Found" appears on the page.

### TC-UI-017
* **Title:** Node agent package download successful
* **Feature:** Node Management
* **Test Type:** UI
* **Priority:** High
* **Tag:** `@regression`
* **Preconditions:**
1. A node with known has been created in the system.
2. Node list page is opened.
* **Steps:**
1. Click "Download" icon in node's row.
2. File with prefix "node" is download.
* **Expected result:**
* The package file is successfully generated and begins downloading.
* The downloaded file name contains the substring "node".
* The download process completes without errors.

* 
### TC-UI-018
* **Title:** Successful user authentication and subsequent logout
* **Feature:** Authentication
* **Test Type:** UI
* **Priority:** Critical
* **Tag:** `@smoke`
* **Preconditions:**
1. The login page is open.
2. Valid user exists.
* **Steps:**
1. Fill in login form with valid credentials.
2. Check that user is logged in and is on the main page.
3. Check that the text "EasyRPA Control Server" displayed on the main page.
4. Call the "Logout" button to log out the system.
5. Check the current URL is on login and the availability of input fields on the login form.
* **Expected result:**
* The user is successfully logged in, and the text "EasyRPA Control Server" displayed on the main page.
* After logging out, a redirect to the `/authrpa/login` URL occurs, and the login form is visible.


### TC-UI-019
* **Title:** Authorization denied when entering invalid or empty credentials
* **Feature:** Authentication
* **Test Type:** UI
* **Priority:** High
* **Tag:** `@regression`
* **Preconditions:**
1. The login page is open.
* **Steps:**
1. Run a test with invalid credentials including incorrect password, empty password, empty username and empty creds.
3. Check the appearance and text of the error message.
* **Expected result:**
* Login fails.
* For each attempt, an error block containing the text "Invalid credentials for user" is displayed.


### TC-UI-020
* **Title:** Successful transition from the main page to the "Find out more" documentation section
* **Feature:** Main Page Navigation / Help & Documentation
* **Test type:** UI
* **Priority:** Medium
* **Tag:** `@regression`
* **Preconditions:**
1. The user is logged in to the system.
2. The main page is opened.
* **Steps:**
1. Click on the button "Find out more".
3. Wait for the new page to fully load.
5. Perform a search for the string "Node Management" using the search line.
6. Check that the current URL of the new tab matches https://cs2.easyrpa.eu/help/.
7. Check that the title of the section being searched for is displayed.
* **Expected result:**
* The link opens in a new browser tab.
* After performing a search, the tab's URL matches https://cs2.easyrpa.eu/help/.
* The page visually displays a heading with the text "Node Management".