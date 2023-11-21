import { Button, Col, Container, Form, Modal, Row  } from "react-bootstrap"
import { useLazyAllRecipeQuery } from "../../slices/recipeApi"
import InfiniteScrollList from "../InfiniteScrollList"
import { useEffect, useState } from "react"
import { FaFilter } from "react-icons/fa"
import { useLazyAllDietQuery } from "../../slices/dietApi"
import { useLazyAllCuisineQuery } from "../../slices/cuisineApi"
import { useLazyAllAllergenQuery } from "../../slices/allergensApi"

const FilterModal = ({
  onToggle,
  isVisible,
  diets,
  setDiets,
  courses,
  setCourses,
  allergens,
  setAllergens
}) => {

  const handleDietChange = (diet) => {
    const updatedDiets = diets.map(d => d.name === diet.name ? ({ ...diet, selected: !diet.selected }) : ({ ...d }));
    setDiets(updatedDiets);
  }

  const handleCourseChange = (course) => {
    const updatedCourses = courses.map(c => c.name === course.name ? ({ ...course, selected: !course.selected }) : ({ ...c }));
    setCourses(updatedCourses);
  }

  const handleAllergenChange = (allergen) => {
    const updatedAllergens = allergens.map(a => a.name === allergen.name ? ({ ...allergen, selected: !allergen.selected }) : ({ ...a }));
    setAllergens(updatedAllergens);
  }

  const handleReset = () => {
    const updatedDiets = diets.map(d => ({ ...d, selected: false }));
    setDiets(updatedDiets);

    const updatedCourses = courses.map(c => ({ ...c, selected: false }));
    setCourses(updatedCourses);

    const updatedAllergens = allergens.map(a => ({ ...a, selected: false }))
    setAllergens(updatedAllergens);
  }

  return (
    <Modal size="xl" show={isVisible} onHide={onToggle} centered>
      <div className="text-center mt-3">
        <h1 className="mb-4 font-weight-bold">Filter</h1>
      </div>
      <Row>
        <Col xs={4} className="border-right py-4">
          <h4 className="mb-4 pl-3">Diet</h4>
          {diets.map(diet => (
            <Form.Check 
              key={diet.name}
              type="checkbox"
              label={diet.name}
              checked={diet.selected}
              onChange={() => handleDietChange(diet)}
              className="ml-3 mb-2"
            />
          ))}
        </Col>
        <Col xs={4} className="border-right py-4">
          <h4 className="mb-4 pl-3">Courses</h4>
          {courses.map(course => (
            <Form.Check 
              key={course.name}
              type="checkbox"
              label={course.name}
              checked={course.selected}
              onChange={() => handleCourseChange(course)}
              className="ml-3 mb-2"
            />
          ))}
        </Col>
        <Col xs={4} className="py-4">
          <h4 className="mb-4 pl-3">Allergies</h4>
          {allergens.map(allergen => (
            <Form.Check 
              key={allergen.name}
              type="checkbox"
              label={allergen.name}
              checked={allergen.selected}
              onChange={() => handleAllergenChange(allergen)}
              className="ml-3 mb-2"
            />
          ))}
        </Col>
      </Row>
      <div className="text-center mt-4 py-4">
        <Button onClick={handleReset}>Reset Filter</Button>
      </div>
    </Modal>
  );
}



const Recipes = () => {
  const [searchValue,setSearchValue] = useState("")
  const [allDiets] = useLazyAllDietQuery();
  const [allCuisines] = useLazyAllCuisineQuery();
  const [allAllergens] = useLazyAllAllergenQuery();
  const [courses, setCourses] = useState([
      {name: "Appetizer", selected: false},
      {name: "Main_Course", selected: false},
      {name: "Dessert", selected: false},
      {name: "Beverage", selected: false},
      {name: "Salad", selected: false},
      {name: "Soup", selected: false},
      {name: "Breakfast", selected: false},
      {name: "Bread", selected: false},
      {name: "Side_Dish", selected: false},
      {name: "Kid_Friendly", selected: false},
    ]);
  const [diets, setDiets] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [allergens, setAllergens] = useState([]);
  const [filters, setFilters] = useState("");
  

  const [isFilterModalVisible,setFilterModalVisible] = useState(false)

  const onToggle = () => {
    setFilterModalVisible(!isFilterModalVisible)
  }

  const [allRecipe] = useLazyAllRecipeQuery();
  const loadRecipe = async (page, limit, searchValue, token, filters) => {
      try {
        const response = await allRecipe({page, limit, searchValue, filters}).unwrap();

        return response
    } catch (error) {
        console.log("Failed to get recipes");
    }
  }

  const fetchFilters = async () => {
    try{
      const dietsResponse = await allDiets().unwrap();
      setDiets(dietsResponse.data.map(diet => ({name: diet.name, selected: false})))

      const cuisinesResponse = await allCuisines().unwrap();
      setCuisines( cuisinesResponse.data.map(cuisine => ({name: cuisine.name, selected: false})))

      const allergenResponse = await allAllergens().unwrap();
      setAllergens(allergenResponse.data.map(allergen => ({ name: allergen.name, selected: false})))
    } catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    (async() => {
      await fetchFilters();
    }) ();
  }, [])

  useEffect(() => {
    const updatedDiets = diets.filter(d => d.selected === true);
    const updatedCourses = courses.filter(c => c.selected === true);
    const updatedAllergens = allergens.filter(a => a.selected === true);
    const selectedFilters = [
      ...updatedDiets.map(diet => `diets=${encodeURIComponent(diet.name)}`),
      ...updatedCourses.map(course => `courses=${encodeURIComponent(course.name)}`),
      ...updatedAllergens.map(allergen => `allergens=${encodeURIComponent(allergen.name)}`)
    ];
    const query = selectedFilters.join('&')
    setFilters(query);
  }, [diets, courses, allergens])
  
  return (
    <Container fluid >
      <div style={
        {
          display: "flex",
          justifyContent: "center",
        }
      }>
        <Form.Control
          value={searchValue} onChange={(event) => setSearchValue(event.target.value)}
          placeholder="Search"
        />
        <Button variant="outline-secondary" onClick={onToggle} > <FaFilter /></Button>
      </div>
      <InfiniteScrollList loadData={loadRecipe} recipe searchValue={searchValue} filters={filters} />
      <FilterModal
        onToggle={onToggle}
        isVisible={isFilterModalVisible}
        diets={diets}
        setDiets={setDiets}
        courses={courses}
        setCourses={setCourses}
        allergens={allergens}
        setAllergens={setAllergens}
      />
    </Container>
)
}

export default Recipes