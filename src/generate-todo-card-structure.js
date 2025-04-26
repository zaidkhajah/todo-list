import { format } from "date-fns";

function generateTodoCardStructure(todo) {
    return {
        "tag": "article",
        "attributes": {
          "className": `todo-card ${todo.priorityString} collapsed`
        },
        "children": [
          {
            "tag": "div",
            "attributes": {
              "className": "title-description"
            },
            "children": [
              {
                "tag": "span",
                "attributes": {},
                "content": todo.title,
              },
              {
                "tag": "span",
                "attributes": {},
                "content": todo.description,
              }
            ]
          },
          {
            "tag": "button",
            "attributes": {
              "className": "expand"
            },
            "children": [
              {
                "tag": "i",
                "attributes": {
                  "className": "fa-solid fa-up-right-and-down-left-from-center"
                }
              },
              {
                "tag": "i",
                "attributes": {
                  "className": "fa-solid fa-window-minimize"
                }
              }
            ]
          },
          {
            "tag": "div",
            "attributes": {
              "className": "duedate-reminder"
            },
            "children": [
              {
                "tag": "span",
                "attributes": {
                  "className": "due-date"
                },
                "content": format(todo.dueDate, "dd/MM/yyyy"),
              },
              {
                "tag": "span",
                "attributes": {
                  "className": "hasReminder"
                },
                "children": [
                  {
                    "tag": "i",
                    "attributes": {
                      "className": "fa-solid fa-bell"
                    }
                  }
                ]
              }
            ]
          },
          {
            "tag": "div",
            "attributes": {
              "className": "checklist"
            }
          },
          {
            "tag": "div",
            "attributes": {
              "className": "divider"
            }
          },
          {
            "tag": "div",
            "attributes": {
              "className": "notes"
            },
            "children": [
              {
                "tag": "textarea",
                "attributes": {
                  "name": "notes",
                  "placeholder": "notes..."
                }
              }
            ]
          }
        ]
      }
}

export default generateTodoCardStructure;

// export default {
//     "tag": "article",
//     "attributes": {
//       "className": "todo-card high-priority collapsed"
//     },
//     "children": [
//       {
//         "tag": "div",
//         "attributes": {
//           "className": "title-description"
//         },
//         "children": [
//           {
//             "tag": "span",
//             "attributes": {},
//             "content": "title"
//           },
//           {
//             "tag": "span",
//             "attributes": {},
//             "content": "description"
//           }
//         ]
//       },
//       {
//         "tag": "button",
//         "attributes": {
//           "className": "expand"
//         },
//         "children": [
//           {
//             "tag": "i",
//             "attributes": {
//               "className": "fa-solid fa-up-right-and-down-left-from-center"
//             }
//           },
//           {
//             "tag": "i",
//             "attributes": {
//               "className": "fa-solid fa-window-minimize"
//             }
//           }
//         ]
//       },
//       {
//         "tag": "div",
//         "attributes": {
//           "className": "duedate-reminder"
//         },
//         "children": [
//           {
//             "tag": "span",
//             "attributes": {
//               "className": "due-date"
//             },
//             "content": "dueDate"
//           },
//           {
//             "tag": "span",
//             "attributes": {
//               "className": "hasReminder"
//             },
//             "children": [
//               {
//                 "tag": "i",
//                 "attributes": {
//                   "className": "fa-solid fa-bell"
//                 }
//               }
//             ]
//           }
//         ]
//       },
//       {
//         "tag": "div",
//         "attributes": {
//           "className": "checklist"
//         }
//       },
//       {
//         "tag": "div",
//         "attributes": {
//           "className": "divider"
//         }
//       },
//       {
//         "tag": "div",
//         "attributes": {
//           "className": "notes"
//         },
//         "children": [
//           {
//             "tag": "textarea",
//             "attributes": {
//               "name": "notes",
//               "placeholder": "notes..."
//             }
//           }
//         ]
//       }
//     ]
//   }
  