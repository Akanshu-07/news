import React, { useEffect,useState } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'




const News =(props)=> {

  const[articles,setArticles]=useState([])
  const[loading,setLoading]=useState(false)
  const[page,setPage]=useState(1)
  const[totalResults,setTotalResults]=useState(0)
  

  const capitalizeFirstLetter = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

 

    const updatenews=async()=>{

      props.setProgress(10);

      const url= `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pagesize=${props.pagesize}`;

     
      setLoading(true)
      let data=await fetch(url);
      props.setProgress(50);
      let parseddata=await data.json()

      setArticles(parseddata.articles)
      setTotalResults(parseddata.totalResults)
      setLoading(false)
     
      props.setProgress(100);
    }

    useEffect(() => {
      document.title=`${capitalizeFirstLetter(props.category)}-News`;
      updatenews();
    }, []);

    

    // const handlePrevClick= async()=>{

 
    //   setPage(page-1);
    //   updatenews()
        
    // }  
    // const handleNextClick= async()=>{
      
    //   setPage(page+1);
    //   updatenews()
    // }

    const fetchMoreData = async() => {
    
      
      const url= `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pagesize=${props.pagesize}`;
      setPage(page+1)
      let data=await fetch(url);
      let parseddata=await data.json()

      setArticles(articles.concat(parseddata.articles))
      setTotalResults(parseddata.totalResults)
      
    };
    

  
    return (
      <div className='conatiner '>

        <h1 className='text-center' style={{margin :'35px',marginTop :'85px'}} >Top {capitalizeFirstLetter(props.category)} headlines</h1>

        {loading && <Spinner/>}
        
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >

        <div className="container">
                <div className="row">

               {articles.map((element)=>{
                return <div className="col-md-4" key={element.url} >
                <NewsItems 
                
                title={element.title ? element.title.slice(0,40) : ""} 
                description={element.description ? element.description.slice(0,80) : ""} 
                imageUrl={element.urlToImage ? element.urlToImage:""} 
                url={element.url}
                author={element.author ? element.author : ""} 
                date={element.publishedAt ? element.publishedAt :""}
                source={element.source.name ? element.source.name :""} />

                </div>
      
            
            })} 
            </div> 
            </div> 

            </InfiniteScroll>



        {/* previous and next button flex */}
          
      </div>
    )
  
}

    News.defaultProps = {
      country: 'in',
      pagesize : 6,
      category : 'general'
    }

    News.propTypes = {
      country : PropTypes.string,
      pagesize : PropTypes.number,
      category : PropTypes.string
    }

export default News

