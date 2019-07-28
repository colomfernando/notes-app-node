# Notes-app-node

[![Version badge](https://img.shields.io/badge/Version-1.0.0-GREEN.svg)](https://shields.io/)

Run npm install

## **Commands available**

* add
* remove
* read
* list

## **Run commands**

```javascript
node app.js command --params
```

## **Commands example**

### Add

Add a note

| Param |  Type  | Required |
| :---: | :----: | :------: |
| title | string |   true   |
| body  | string |   true   |

Example:

```javascript
node app.js add --title='Title of the note' --body='Body of the note'
```

Output:

```javascript
// Title null
'Title is required'

// Body null
'body is required'

// on Error with database
'Try in a few minutes'

//on success
'Document saved`
```

---

### Remove

Remove a note by id

| Param |  Type  | Required |
| :---: | :----: | :------: |
|  id   | number |   true   |

Example:

```javascript
node app.js remove --id=2
```

Output:

```javascript
// Id null
'params invalid'

// on Error with database
'Try in a few minutes'

//on success
'Document removed`
```

---

### Read

Read a note by id

| Param |  Type  | Required |
| :---: | :----: | :------: |
|  id   | number |   true   |

Example:

```javascript
node app.js read --id=2
```

Output:

```javascript
// Id null
'params invalid'

// on document not found
'Document not found'

//on document found
| id  | Title                   | Body                   |
| --- | ----------------------- | ---------------------- |
| 2   | 'Title of the document' | 'Body of the document' |
```

---

### List

List notes

Example:

```javascript
node app.js list
```

Output:

```javascript
// empty notes
'there are no notes to show'

// on document not found
'Document not found'

//on documents found
| id  | Title                   | Body                   |
| --- | ----------------------- | ---------------------- |
| 2   | 'Title of the document' | 'Body of the document' |
| 3   | 'Title of the document' | 'Body of the document' |
| 4   | 'Title of the document' | 'Body of the document' |
| 5   | 'Title of the document' | 'Body of the document' |
| 6   | 'Title of the document' | 'Body of the document' |
| 7   | 'Title of the document' | 'Body of the document' |
```

---
