import { v4 as uidV } from "uuid";

export default function Reducers(CurrentS, action) {
  switch (action.type) {
    //create NewOb
    case "Add": {
      const NewObject = {
        id: uidV(),
        title: action.payload.title,
        datails: action.payload.dateils,
        iscompleted: false,
      };
      const localS = [...CurrentS, NewObject];
      localStorage.setItem("todos", JSON.stringify(localS));
      return localS;
    }
    //===create NewOb===

    //Edit Element
    case "Edit": {
      const Edit = CurrentS.map((T) => {
        if (T.id == action.payload.dialog.id) {
          return {
            ...T,
            title: action.payload.title,
            datails: action.payload.datails,
          };
        } else {
          return T;
        }
      });
      localStorage.setItem("todos", JSON.stringify(Edit));
      return Edit;
    }
    //===Edit Element===

    //delet element
    case "delet": {
      const delet = CurrentS.filter((t) => t.id != action.payload.dialog.id);
      localStorage.setItem("todos", JSON.stringify(delet));
      return delet;
    }
    //===delet element===

    //Check element
    case "Check": {
      const checked = CurrentS.map((T) => {
        if (T.id == action.payload.todo.id) {
          return { ...T, iscompleted: !T.iscompleted };
        } else {
          return T;
        }
      });
      localStorage.setItem("todos", JSON.stringify(checked));
      return checked;
    }
    //===Check element===

    //get information from localStorage
    case "getload": {
      const getlocalS = JSON.parse(localStorage.getItem("todos")) || [];
      return getlocalS;
    }
    //====get information from localStorage===

    //Remove All Todos from loaclS
    case "Removeall": {
      localStorage.setItem("todos", JSON.stringify([]));
      return [];
    }
    //===Remove All Todos from loaclS====

    default: {
      throw Error("problem with" + action.type);
    }
  }
}
