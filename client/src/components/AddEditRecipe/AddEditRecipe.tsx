import {
    Button,
    Col,
    Container,
    FloatingLabel,
    Form,
    FormSelect,
    ListGroup,
    ListGroupItem,
    Row,
  } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useLazyAllCuisineQuery } from "../../slices/cuisineApi";
import { useLazyAllTagsQuery, useAddTagMutation } from "../../slices/tagApi";
import { useLazyAllDietQuery } from "../../slices/dietApi";
import { useAllIngredientsMutation, useLazySearchIngredientsQuery } from "../../slices/ingredientApi";
import { useLazyAllAllergenQuery, useLazySearchAllergenQuery } from "../../slices/allergensApi";
import { useAddRecipeMutation, useEditRecipeMutation } from "../../slices/recipeApi";
import { useLazyAllUnitsQuery } from "../../slices/unitApi";
import { useSelector } from "react-redux";
import CreatableSelect from "react-select/creatable";
import AsyncSelect from 'react-select/async'
import Select from 'react-select'
import FilePicker from "../FilePicker";
import { RootState } from "../../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import Steps from "./components/Steps";

import './AddEditRecipe.css'
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router";

interface IAddEditRecipeProps {
  onToggle?: () => void;
  recipe?: any;
}

const AddEditRecipe = ({recipe, onToggle}: IAddEditRecipeProps) => {
    const token = useSelector((state:RootState) => state.auth.token)
    const images = useSelector((state:RootState) => state.images.imageUrls);

    const [allCuisine] = useLazyAllCuisineQuery();
    const [allTags] = useLazyAllTagsQuery();
    const [allDiet] = useLazyAllDietQuery();
    const [allIngredients] = useAllIngredientsMutation();
    const [allAllergen] = useLazyAllAllergenQuery();
    const [allUnits] = useLazyAllUnitsQuery();
    const [addRecipe] = useAddRecipeMutation();
    const [editRecipe] = useEditRecipeMutation();
    const [searchAllergen] = useLazySearchAllergenQuery();
    const [searchIngredient] = useLazySearchIngredientsQuery();
    const [addTag] = useAddTagMutation()
    const navigate = useNavigate();

    const [cuisineOptions, setCuisineOptions] = useState([]);
    const [tagsOptions, setTagsOptions] = useState([]);
    const [dietOptions, setDietOptions] = useState([]);
    const [ingredientOptions, setIngredientOptions] = useState([]);
    const [allergenOptions, setAllergenOptions] = useState([]);
    const [unitsOptions, setUnitsOptions] = useState([]);
    const [detailedIngredientList, setDetailedIngredientList] = useState([])
    const [formDetails, setFormDetails] = useState({
        title: '',
        description: '',
        ingredient: {label: "", value: null},
        quantity: 1,
        unit: {label: "", value: null},
        diet: null,
        tags: [],
        course: null,
        steps: [""],
        allergens: [],
        cuisine: ''
    })

    const [courses, setCourses] = useState([
      "Appetizer",
      "Main_Course",
      "Dessert",
      "Beverage",
      "Salad",
      "Soup",
      "Breakfast",
      "Bread",
      "Side_Dish",
      "Kid_Friendly",
    ])

    const formatFormDetails = (formDetails) => {
      const {ingredient, allergens, tags, steps, quantity, unit, diet, cuisine} = formDetails;
      return {
          ...formDetails,
          ingredients: detailedIngredientList.map((detailedIngredient) => ({
              id: Number(detailedIngredient.ingredient.value),
              quantity: detailedIngredient.quantity,
              unit: Number(detailedIngredient.unit.value)
          })),
          allergen: allergens.map(allergen => allergen.value),
          tags: tags.map(tag => Number(isNaN(tag.value) ? 0 : tag.value)),
          steps: steps.filter(step => step !== ""),
          images,
          diet: Number(diet),
          cuisine: Number(cuisine),
          token
      }
  }

  const searchOption = (apiType) => async (searchValue, callback) => {
    switch(apiType) {
      case 'allergen':
        const {data: responseAllergen} = await searchAllergen(searchValue).unwrap()
        callback(responseAllergen.map((allergen) => ({
          label: allergen.name,
          value: allergen.id
        })));
        case 'ingredients':
          const { data: responseIngredient } = await searchIngredient(searchValue).unwrap();
          callback(responseIngredient.map((ingredient) => ({
            label: ingredient?.name,
            value: ingredient?.id
          })))
        default:
          break
    }
  }

  const createOption = (apiType) => async (newValue) => {
    switch(apiType) {
      case 'steps':
        setFormDetails({...formDetails, steps: [...formDetails.steps, {value: newValue, label: newValue}]})
        break;
      case 'tags':
        const {data: {tags: [tagId]}} = await addTag({
          token, tags: [
            {text: newValue}
          ]
        }).unwrap()
        
        setTagsOptions([...tagsOptions, {value: tagId, label: newValue}])
        setFormDetails({...formDetails, tags: [...formDetails.tags, {value: tagId, label: newValue}]})
        break
      default: 
        break
    }
  }

    const submitForm = async (event) => {
        try {
            event.preventDefault();
            const formattedFormDetails = formatFormDetails(formDetails);
            if(formattedFormDetails.steps.length == 0){
              alert("Please mention recipe steps");
              return
            }
            if(formattedFormDetails.diet == 0){
              alert('Please choose a diet.');
              return
            }
            if(formattedFormDetails.ingredients.length == 0){
              alert('Please enter ingredients');
              return
            }
            if(!formattedFormDetails.course){
              alert('Please choose a meal course.');
              return
            }
            if(!recipe){
              const response = await addRecipe(formattedFormDetails).unwrap();
              navigate("/recipes")
            } else {
              const response = await editRecipe({...formattedFormDetails, id: recipe.id}).unwrap();
              window.location.reload(false);
            }
            onToggle()
        } catch (error) {
            console.log(error)   
        }
    }

    const onInputChange = (event) => {
        setFormDetails({...formDetails, [event.target.name]: event.target.value})
    }

    const onSelectChange = (selectName) => (selectValue) => {
        setFormDetails({...formDetails, [selectName]: selectValue})
    }

    const addIngredient = () => {
      const newIngredient = {ingredient: formDetails.ingredient, quantity: formDetails.quantity, unit: formDetails.unit}
      setFormDetails({...formDetails, ingredient: {label: "", value: null} , quantity: 1, unit: {label: "", value: null}})
      setDetailedIngredientList([...detailedIngredientList, newIngredient])
    }

    const removeIngredient = (index: number) => {
      const updatedIngredients = detailedIngredientList.filter((ingredient, _index) => index !== _index)
      setDetailedIngredientList(updatedIngredients)
    }

    const setSteps = (updatedSteps) => {
      setFormDetails({...formDetails, steps: updatedSteps})
    }


    useEffect(() => {
      (async () => {
        // fetch all the necessary options for the form and if the recipe is being edited,
        const { data: cusineList } = await allCuisine().unwrap();
        const { data: tagsList } = await allTags().unwrap();
        const { data: dietList } = await allDiet().unwrap();
        const { data: ingredientList } = await allIngredients().unwrap();
        const { data: allergenList } = await allAllergen().unwrap();
        const { data: unitsList } = await allUnits().unwrap();
        
        const [initialCuisine] = cusineList
        const [initialDiet] = dietList
        const [initialIngredient] = ingredientList
        const [initialUnit] = allergenList

        setCuisineOptions(cusineList);
        setTagsOptions(tagsList.map((tag) => ({label: tag.text, value: tag.id})));
        setDietOptions(dietList);
        setIngredientOptions(ingredientList.map((ingredient) => ({ label: ingredient.name, value: ingredient.id})));
        setAllergenOptions(allergenList.map((allergen) => ({label: allergen.name, value: allergen.id})));
        setUnitsOptions(unitsList);

        const newFormDetails = {
          ...formDetails,
          title: recipe?.title ?? "",
          description: recipe?.description ?? "",
          steps: recipe?.steps ?? [""],
            cuisine: recipe?.cuisine?.id?? initialCuisine.id,
            diet: recipe?.diet?.id?? null,
            ingredient: recipe?.ingredients?? initialIngredient.id,
            unit: initialUnit.id,
            tags: recipe?.tags.map(tag => ({label: tag.text, value: tag.id})) ?? [],
            course: recipe?.course ?? "",
            allergens: recipe?.allergen.map(({ id, name }) => ({ label: name, value: id})) ?? []
        };

        setFormDetails(newFormDetails)

        setDetailedIngredientList(recipe?.ingredients.map(ingredient => ({ingredient: {label: ingredient.name, value: ingredient.id }, quantity: ingredient.quantity, unit:{label: ingredient.unit, value: ingredient.unitId }  })) ?? [])
      })();
    }, [recipe]);

    return (
      <>
        <Form onSubmit={submitForm} className="p-4">
          <h2 className="mb-4">Add recipe details</h2>
          <Container fluid >
            <Row className="mb-2">
              <Col>
                <Form.Group controlId="title">
                  <FloatingLabel controlId="floatingInput" label={"Title"}>
                    <Form.Control
                      onChange={onInputChange}
                      value={formDetails.title}
                      name={'title'}
                      type="text"
                      required
                      placeholder="Enter the recipe title"
                    />
                  </FloatingLabel>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col>
                <Form.Group controlId="description">
                  <FloatingLabel controlId="floatingInput" label={"Description"}>
                    <Form.Control
                      onChange={onInputChange}
                      value={formDetails.description}
                      name={'description'}
                      type="textarea"
                      required
                      placeholder="Enter the recipe description"
                    />
                  </FloatingLabel>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col>
                <Form.Group controlId="steps">
                  <Form.Label>
                    Steps
                  </Form.Label>
                    <Steps steps={formDetails.steps} setSteps={setSteps} />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col>
                <Form.Group controlId="cuisine">
                  <FloatingLabel controlId="floatingInput" label={"Cuisine"}>
                    <FormSelect 
                      name={'cuisine'}
                      onChange={onInputChange}
                      value={formDetails.cuisine}>
                      {cuisineOptions.map((cuisineOption) => (
                        <option key={cuisineOption.id} value={cuisineOption.id}>
                          {cuisineOption.name}
                        </option>
                      ))}
                    </FormSelect>
                  </FloatingLabel>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col>
                <Form.Group controlId="tags">
                    <CreatableSelect
                        placeholder="Tags"
                        isMulti
                        value={formDetails.tags}
                        onChange={onSelectChange('tags')}
                        onCreateOption={createOption('tags')}
                        options={tagsOptions}
                    />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col>
                <Form.Group controlId="diet">
                    <FormSelect
                      name={'diet'}
                      onChange={onInputChange}
                      defaultValue={""}
                      required
                      value={formDetails.diet}>
                        <option value="" disabled >Diet</option>
                      {dietOptions.map((dietOption) => (
                        <option key={dietOption.id} value={dietOption.id}>
                          {dietOption.name}
                        </option>
                      ))}
                    </FormSelect>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <Form.Label>
                  Ingredients
                </Form.Label>
                <ListGroup as={"ul"} className="mb-2">
                  {
                    ingredientOptions.length &&
                    detailedIngredientList.map((detailedIngredient, index) => <ListGroupItem key={detailedIngredient.id} as={"li"}>
                      {detailedIngredient.quantity} {
                        detailedIngredient.unit.label
                      }{detailedIngredient.quantity > 1 ? "(s)": ""} of {detailedIngredient.ingredient.label}
                      <Button key={index} style={{float: "right"}} variant="danger" onClick={() => removeIngredient(index)} ><FaTrash /></Button>
                    </ListGroupItem>)
                  }
                </ListGroup>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col lg={"5"}>
                <Form.Group controlId="ingredient">
                    <AsyncSelect 
                      cacheOptions
                      placeholder="Ingredient"
                      value={formDetails.ingredient}
                      loadOptions={searchOption('ingredients')}
                      onChange={onSelectChange('ingredient')}
                      defaultOptions={ingredientOptions}
                    />
                </Form.Group>
              </Col>
              <Col lg={"3"}>
                <Form.Group display controlId="quantity">
                    <Form.Label>Qty</Form.Label>
                    <Form.Control type="number" placeholder="Quantity"
                      name={'quantity'}
                      onChange={onInputChange}
                      value={formDetails.quantity} 
                      min={1}
                    />
                </Form.Group>
              </Col>
              <Col lg={"3"}>
                <Form.Group controlId="unit">
                    <Select 
                      name="unit"
                      required={formDetails.ingredient.value}
                      placeholder={"Unit"}
                      options={unitsOptions.map(unit => ({ label: unit.name, value: unit.id}))}
                      value={formDetails.unit}
                      onChange={(option) => {
                        setFormDetails({...formDetails, unit: { value: option?.value, label: option?.label }})
                      }}
                    />
                </Form.Group>
              </Col>
              <Col lg={"1"}>
                  <FontAwesomeIcon icon={faAdd} onClick={() => addIngredient()} />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col>
                <Form.Group controlId="course">
                    <FormSelect
                      name={'course'}
                      onChange={(e) => setFormDetails({ ...formDetails, course: e.target.value})}
                      defaultValue={""}
                      required
                      value={formDetails.course}>
                        <option value={""} disabled selected>Course</option>
                      {courses.map((course) => (
                        <option key={course} value={course}>
                          {course}
                        </option>
                      ))}
                    </FormSelect>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col>
                <Form.Group controlId="allergen">
                    <AsyncSelect 
                      placeholder="Allergens"
                      isMulti
                      value={formDetails.allergens}
                      onChange={onSelectChange('allergens')}
                      loadOptions={searchOption('allergens')}
                      defaultOptions={allergenOptions}
                    />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-2">
              {
                !recipe && <Col lg={6} >
                  <FilePicker />
                </Col>
              }
              <Col lg={6} >
                <Button variant="primary" type="submit">
                  {
                    recipe ? "Save" : "Add recipe"
                  }
                </Button>
              </Col>
            </Row>
          </Container>
        </Form>
      </>
    );
  };
  
  export default AddEditRecipe;
  