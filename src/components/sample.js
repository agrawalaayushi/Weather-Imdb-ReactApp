
const { createStore, combineReducers, applyMiddleware, bindActionCreators } = Redux;
const { Provider, connect } = ReactRedux;

// Initial Recipes
let recipes = [
  {
      name: 'Omelette', 
      ingredients: [
        '3 Eggs', '1/3 cup Grated chedder cheese', 'half cup of spinach', '1/4 cup of diced onions'
      ], 
      directions: 'Pay someone else to make your Omelette!'
    },
    {
      name: 'Chicken Quesadilla', 
      ingredients: [
        '2 tortillas',
        '1/4c chedderjack cheese',
        '1/4c diced tomatoes',
        '1/4c diced chicken breast (cooked)',
        '1tbsp butter'
      ],
      directions: 'Pay someone else to make your quesadilla!'
    }
  ];

//====== Action Type constants ======//
// Recipe Actions
const GET_ALL_RECIPES = 'GET_ALL_RECIPES';
const SET_CURRENT_RECIPE = 'SET_CURRENT_RECIPE';
const EDIT_RECIPE = 'EDIT_RECIPE';
const UPDATE_RECIPE = 'UPDATE_RECIPE';
const CREATE_RECIPE = 'CREATE_RECIPE';
const DELETE_RECIPE = 'DELETE_RECIPE';
const SAVE_NEW_RECIPE = 'SAVE_NEW_RECIPE';

// Modal Actions
const TOGGLE_MODAL = 'TOGGLE_MODAL';
const DISMISS_MODAL = 'DISMISS_MODAL';

//------ End Action Type constants -----//

//====== Action Creators ======//
const actions = {
  getAllRecipes: () => {
    return (dispatch) => {   
     dispatch(
       {
        type: GET_ALL_RECIPES,
        payload: recipes
      }
     ); 
    }
  },

  setCurrentRecipe: (recipe) => {
    return {
      type: SET_CURRENT_RECIPE,
      payload: recipe
    }
  },
  editRecipe: () => {
    return {
      type: EDIT_RECIPE
    }
  },
  
  updateRecipe: (recipe) => {
    return {
      type: UPDATE_RECIPE,
      payload: recipe
    }
  },
  
  createRecipe: (recipe) => {
    return {
      type: CREATE_RECIPE
    }
  },
  
  saveNewRecipe: (recipe) => {
    return {
      type: SAVE_NEW_RECIPE,
      payload: recipe
    }
  },
  
  deleteRecipe: (recipeId) => {
    return {
      type: DELETE_RECIPE,
      payload: recipeId
    }
  },
  
  toggleModal: () => {
    return {
      type: TOGGLE_MODAL
    }
  }
}

//------ End Action Creators ------//

//====== Reducer Helpers =========//
function getNextId(lastId) {
  return lastId + 1;
}

//------ End Reducer Helpers -----//

//====== Reducers ======//
const INITIAL_RECIPE_STATE = {
  lastId: 0,
  all: [],
  currentRecipe: {id: null}
}

function RecipeReducer(state = INITIAL_RECIPE_STATE, action) {
  switch(action.type) {
    case GET_ALL_RECIPES:
      let lastId = state.lastId;
      let recipes = action.payload.recipes.all.map(recipe => {
        lastId = getNextId(lastId);
        recipe.id = lastId;
        return recipe;
      }); 
      return Object.assign({}, state, {lastId: lastId}, {all: recipes});

    case SET_CURRENT_RECIPE:
      let newCurrent = state.currentRecipe.id === action.payload.id ? INITIAL_RECIPE_STATE.currentRecipe 
        : action.payload;
      return Object.assign({}, state, {currentRecipe: newCurrent});

    case UPDATE_RECIPE:
      return Object.assign({}, state, {currentRecipe: action.payload}, {all: state.all.map(recipe => {
          if (recipe.id === action.payload.id) {
            return action.payload;
          }
          return recipe
        })}
      );

    case SAVE_NEW_RECIPE:
      let newRecipe = action.payload;
      newRecipe.id = getNextId(state.lastId);
      let allRecipes = state.all;
      allRecipes.push(newRecipe);
      return Object.assign({}, state, {all: allRecipes});
      
    case DELETE_RECIPE:
      return Object.assign({}, state, {all: state.all.filter(recipe => {
          return recipe.id !== action.payload; 
        })
      });
    default:
      return state;
  }
}

const INITIAL_MODAL_STATE = {
  isOpen: false,
  newEntry: false
}

function ModalReducer(state = INITIAL_MODAL_STATE, action) {
  switch(action.type) {
    case TOGGLE_MODAL:
      return Object.assign({}, state, {isOpen: !state.isOpen});
    case EDIT_RECIPE:
      return Object.assign({}, state, {newEntry: false});
    case CREATE_RECIPE:
      return Object.assign({}, state, {newEntry: true});
    default:
      return state;
  }
}
//------ End Reducers -------//

//====== Redux Middleware ======//

function thunkMiddleware({ dispatch, getState }) {
  return next => action =>
    typeof action === 'function' ?
      action(dispatch, getState) :
      next(action);
}


// Update certain parts of state in local storage
const persistData = store => next => action => {
 
  let localState = localStorage.getItem('recipe-collection');
  
  if (localState && typeof JSON.parse(localState) === 'object') {
    localState = JSON.parse(localState);
  }
  else {
    let all = action.payload;
    let recipeState = { all: all};
    localState = Object.assign({}, {recipes: recipeState});
  }
  
  let result;
  let newAction;
  
  switch(action.type) {
    case GET_ALL_RECIPES:
      newAction = {type: action.type};
      newAction.payload = localState;
      localStorage.setItem('recipe-collection', JSON.stringify(localState));
      result = next(newAction);
      return result;
    case SAVE_NEW_RECIPE:
      localState.recipes.all.push(action.payload);
      localStorage.setItem('recipe-collection', JSON.stringify(localState));
    case DELETE_RECIPE:
      localState.recipes.all = localState.recipes.all.filter((recipe, index) => {
        return (index + 1) !== action.payload;
      });
      localStorage.setItem('recipe-collection', JSON.stringify(localState));
    case UPDATE_RECIPE:
      localState.recipes.all = localState.recipes.all.map((recipe, index) => {
        if (index + 1 === action.payload.id) {
          return action.payload;
        }
        return recipe;
      });      
      localStorage.setItem('recipe-collection', JSON.stringify(localState));
    default:
      result = next(action);
      return result;
  }
}


//------ End Redux Middleware ------//


const IngredientList = (props) => {
    var count = 1;
    var rows = props.ingredients.map((ingredient) => {
      return <tr key={count++}>
        <td>{ingredient}</td>
      </tr>
    });
    return (
      <table className="ingredients">
      <tbody>
        {rows}
      </tbody>
    </table>
    );
};

const Directions = (props) => {
    return (
      <div 
      className='directions'
      > 
        <h4 className="sub-header">Directions</h4>
        <p>{props.directions}</p>
    </div>    
  );
};

class Modal extends React.Component {
  constructor(props) {
    super(props);
    
    if (!props.modal.newEntry) {
      this.state = ({
        name: props.name,
        ingredients: props.ingredients,
        directions: props.directions,
        errors: ''
      });
    } else {
      this.state = ({
        name: '',
        ingredients: [],
        directions: '',
        errors: ''
      });
    }
  }
  
  componentDidMount() {
    $('#editRecipe').modal('show');
  }
  
  closeModal() {
    // need to have component inside different this context
    let modalComponent = this;
    $('#editRecipe').modal('hide');
    // Make sure bootstrap modal close finishes before 
    // changing modal isOpen to false otherwise background gets stuck
    $('#editRecipe').on('hidden.bs.modal', function () {
      modalComponent.props.actions.toggleModal();
    });
  }
  
  handleDelete() {
    if (this.props.id && !this.props.modal.newEntry) {
      this.props.actions.deleteRecipe(this.props.id);  
    }
    this.closeModal();
  }
  
  handleSave() {
    let recipe = {
        id: this.props.id,
        name: this.state.name,
        ingredients: this.state.ingredients,
        directions: this.state.directions
    }
    if (recipe.name.length < 1 || recipe.ingredients.length < 1) {
      let errors = [];
      if (recipe.name.length < 1) {
        errors.push('Recipe name is required.');
      } 
      if (recipe.ingredients.length < 1) {
        errors.push('You must include at least one ingredient.');
      }
      if (errors.length >= 1) {
        this.setState({
          errors: errors.join(' ')
        });
        return;
      }
    }
    if (!this.props.modal.newEntry) {
      this.props.actions.updateRecipe(recipe);
    }
    else {
      // Save a new recipe
      this.props.actions.saveNewRecipe(recipe);
    }
    this.closeModal();
  }
  
  handleNameChange(e) {
    e.preventDefault();
    this.setState({
      name: e.target.value
    });
  }
  
  handleIngredientsChange(e) {
    e.preventDefault();
    this.setState({
      ingredients: e.target.value.split(',')
    });
  }
  
  handleDirectionsChange(e) {
    e.preventDefault();
    this.setState({
      directions: e.target.value
    });
  }
  
  render() {
    if (!this.props.modal.isOpen) {
      this.closeModal();
    }
    return <div 
      id={"editRecipe"}
      className="modal fade" 
      data-backdrop="static"       
      tabIndex="-1" 
      role="dialog"       
        >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button 
                onClick={this.closeModal.bind(this)}
                type="button" className="close" 
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
              {
                !this.props.id ?  
                <h4 className="modal-title">Edit Recipe</h4>
                : <h4 className="modal-title">Create Recipe</h4>
              }
            </div>
            <div className="modal-body">
              <div className="input-form-group">
                <label htmlFor="recipe-name">Recipe Name</label>
                <input type="text" 
                  onChange={this.handleNameChange.bind(this)}
                  id="recipe-name" 
                  className="form-control"
                  value={this.state.name}
                  name="recipe"/>
              </div> 
                
              <div className="input-form-group">
                <label htmlFor="ingredients">Ingredients (Separate by a comma)</label>
                <textarea 
                  onChange={this.handleIngredientsChange.bind(this)}
                  type="text" 
                  id="ingredients" 
                  className="form-control"
                  value={this.state.ingredients}
                  defaultValue={this.state.ingredients} 
                  name="ingredients"
                >
                  </textarea>
              </div>   
              <div className="input-form-group">
                <label htmlFor="directions">Directions</label>
                <textarea 
                  onChange={this.handleDirectionsChange.bind(this)}
                  type="text" 
                  id="directions" 
                  className="form-control" 
                  name="directions"
                  value={this.state.directions}
                  defaultValue={this.state.directions}
                >
                </textarea>  
              </div>
              <p className="text-danger">
                {this.state.errors}
              </p>
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-default"
                onClick={this.closeModal.bind(this)}
              >
                  Cancel
              </button>
              <button 
                onClick={this.handleSave.bind(this)}
                type="button" 
                className="btn btn-primary"
              >
                Save changes
              </button>
              <button 
                onClick={this.handleDelete.bind(this)}
                type="button" 
                className="btn btn-danger bottom-left"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
    </div>
  }
};

const mapStateToModalProps = (state) => {
  return {
    id: state.recipes.currentRecipe.id,
    newEntry: state.modal.newEntry,
    name: state.recipes.currentRecipe.name,
    ingredients: state.recipes.currentRecipe.ingredients,  
    directions: state.recipes.currentRecipe.directions,
    modal: state.modal
  };
}

const mapDispatchToModalProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

Modal = connect(mapStateToModalProps, mapDispatchToModalProps)(Modal);

class Recipe extends React.Component {
  
  setCurrentRecipe(e) {
    e.preventDefault();
    e.stopPropagation();
       
    let $currentPanel = $(e.target).closest('div').children('.recipe-info');
    let currentRecipe = {
      id: this.props.id,
      name: this.props.name,
      ingredients: this.props.ingredients,
      directions: this.props.directions
    };
    this.props.actions.setCurrentRecipe(currentRecipe);
    $('.recipe-info').not($currentPanel).slideUp(400);
    $(e.target).closest('div').children('.recipe-info').slideToggle(400);
  }
  
  editRecipe() {
    this.props.actions.editRecipe();
    this.props.actions.toggleModal();
  }
  
  render() {
    return (
      <div className="recipe">
        <a onClick={this.setCurrentRecipe.bind(this)}
            href="#">
            <h4 className={"recipe-header" + (this.props.active ? " active" : "")}
              >
              {this.props.name}       
              <i 
                className={"glyphicon" + (this.props.active ? " glyphicon-minus-sign" : " glyphicon-plus-sign")}>
              </i>
            </h4>
          </a>
        <div className="recipe-info">
          <h4 className="sub-header">Ingredients</h4>
          <IngredientList ingredients={this.props.ingredients} />
          <Directions directions={this.props.directions} />
          <button 
            onClick={this.editRecipe.bind(this)}
            className="btn edit-btn"
          >
              Edit
          </button>
        </div>
      </div>      
    );
  }
};

class RecipeApp extends React.Component {
  createRecipe() {
    this.props.actions.createRecipe();
    this.props.actions.toggleModal();
  }
  
  render() {
    return (
    <div id="main-container">
        <h1>Bon Appétit</h1>
      <div id="container">   
        {
          this.props.modal.isOpen ?
            <Modal />
          : null  
          } 
        <div className="recipe-app"> 
          {this.renderRecipes()}
        </div>
        <button
          onClick={this.createRecipe.bind(this)}
          className="btn btn-success btn-create"
        >
          New Recipe
        </button>
      </div>
     </div> 
    );     
  }
  
  componentDidMount() {
    this.props.actions.getAllRecipes();
  }
  
  renderRecipes() {
    if (!this.props.recipes || this.props.recipes.length < 1) {
      return (
        <h4>No recipes yet. Click 'New Recipe' to get started!</h4>
      );
    }
    const recipeList = this.props.recipes.map(recipe => {
      return <Recipe 
               key={recipe.id} 
               active={
                recipe.id === this.props.currentRecipe.id ? 
                  true 
                  : false 
               } 
               {...recipe}
               actions={this.props.actions}
              />
    });
    return recipeList;
  }
};

const mapStateToRecipeAppProps = (state) => {
  return {
    recipes: state.recipes.all,
    currentRecipe: state.recipes.currentRecipe,
    modal: state.modal
  }
} 

const mapDispatchToRecipeAppProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

 RecipeApp = connect(mapStateToRecipeAppProps, mapDispatchToRecipeAppProps)(RecipeApp);

//====== Set up Redux configuration ======//
const rootReducer = combineReducers({
  recipes: RecipeReducer,  
  modal: ModalReducer
});

// const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

//------ End Redux Configuration -----//

ReactDOM.render(
  <Provider store={createStore(rootReducer, applyMiddleware(thunkMiddleware, persistData))}>
    <RecipeApp />
  </Provider>, 
  document.querySelector('#container'));
