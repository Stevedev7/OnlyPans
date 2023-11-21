import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import RecipeCard from "./components/RecipeCard";
import './InfiniteScrollList.css'
import Review from "./components/Review";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import AddReviewModal from "./components/AddReviewModal";

interface IInfiniteScrollListProps {
  recipe?: boolean;
  review?: boolean;
  searchValue: string | number;
  loadData: () => {data: any[], count: number};
  token: string;
}

const InfiniteScrollList = ({ recipe = false, review = false, loadData, searchValue="", token="", filters=""}: IInfiniteScrollListProps) => {
  return (
    <>
      {
        recipe && <RecipeSection loadData={loadData} searchValue={searchValue} token={token} filters={filters} />
      }
      
      {
        review && <ReviewSection loadData={loadData} id={searchValue}/>
      }
    </>
  );
};

export default InfiniteScrollList;


const ReviewSection = ({loadData, id}) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [dataList, setDatalist] = useState([]);
  const [doneLoading, setDoneLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const [isReviewModalVisible,setReviewModalVisible] = useState(false)
  const isAuthenticated: boolean = useSelector((state: RootState) => state.auth.isAuthenticated);

  const onToggle = () => {
    setReviewModalVisible(!isReviewModalVisible)
  }

  const fetchData = async () => {
    const { data: newDataList, count } = await loadData(pageNumber, 25, id);
    const updatedList: any[] = [...dataList, ...newDataList];
    setDatalist(updatedList);
    setPageNumber(pageNumber + 1);
    setTotalCount(count);
    if (updatedList.length >= count) {
      setDoneLoading(true);
    }
  };
  const refresh = async () => {
    setPageNumber(1)
    setDataList([])
    await fetchData()
  }

  useEffect(() => {
    (async () => {
      await fetchData();
    })();
  }, [id]);
  return (
    <>
      <InfiniteScroll
        style={{
          width: "100%"
        }}
        refreshFunction={refresh}
          scrollThreshold={1}
          dataLength={totalCount}
          next={fetchData}
          hasMore={!doneLoading}
          loader={<Spinner as='div' className="spinner" animation="border" />}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>{totalCount == 0 ? "No reviews yet..." : "Nothing more to load..."}.</b>
            </p>
          }
        >
        <>
          <Row className="align-items-center">
            <Col md={10} sm={10}>
              <div style={
                {
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }
              }>

              <h3 style={{ translate: "48px"}}>Reviews</h3>
              </div>
            </Col>
            <Col md={2} sm={2} className="text-right">
              <div style={{
                width: "100%",
                display: 'flex',
                justifyContent: "flex-end",
                alignItems: "center",
              }}>
                <Button variant='outline-secondary' onClick={onToggle} disabled={!isAuthenticated} >
                  <FaPlus />
                </Button>
              </div>
            </Col>
          </Row>
          <Container>
            <Row>
              {
                dataList.map(data => <Review key={data.id} reviews={dataList} setReviews={setDatalist} review={data} />)
              }
            </Row>
          </Container>
        </>
      </InfiniteScroll>
      {
        isAuthenticated && <AddReviewModal onToggle={onToggle} isVisible={isReviewModalVisible} id={Number(id)} />
      }
  </>
  )
}

const RecipeSection = ({loadData, searchValue="", token="", filters}) => {

  const [pageNumber, setPageNumber] = useState(1);
  const [dataList, setDatalist] = useState([]);
  const [doneLoading, setDoneLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const fetchData = async (resetPage) => {
    const { data: newDataList, count } = await loadData(resetPage?1:pageNumber, 25, searchValue, token, filters);
    let updatedList: any[] = [...dataList, ...newDataList];
    if(resetPage){
      updatedList = [...newDataList]
    }
    setDatalist(updatedList);
    if(!resetPage) {
      setPageNumber(pageNumber + 1);
    }
    setTotalCount(count);
    if (updatedList.length >= count) {
      setDoneLoading(true);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchData(true);
      console.log(filters)
    })();
  }, [searchValue, filters]);

  return (
    <InfiniteScroll
        style={{
          width: "100%"
        }}
          scrollThreshold={1}
          dataLength={totalCount}
          next={fetchData}
          hasMore={!doneLoading}
          loader={<Spinner as='div' className="spinner" animation="border" />}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>{totalCount == 0 ? "No recipes yet..." : "Nothing more to load..."}</b>
            </p>
          }
        >
        <Row > 
        {
          dataList.map(data => <RecipeCard key={data.id} recipe={data} />)
        }
        </Row>
      </InfiniteScroll>
  )
}
