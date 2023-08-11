import React from 'react'

const NewsItems =(props)=> {

    let {title,description,imageUrl,url,author,date,source} = props;

    return (
      <div className='my-3'>
            <div className="card" style={{width: "18rem"}}>
                <img src={imageUrl ? imageUrl : "https://indiaeducationdiary.in/wp-content/uploads/2020/08/Default-Image-IED.png"} className="card-img-top" alt="..."/>
                <div className="card-body">
                <h5 className="card-title">{title}... 
                <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left : '50%'}}>{source}
                <span className="visually-hidden">unread messages</span>
                </span></h5>
                
                <p className="card-text">{description}...</p>

                <p className="card-text"><small className="text-primary">
                  By {author ? author : "Unknown"} on {new Date(date).toGMTString()} </small>
                </p>
                
                <a rel="noreferrer" href={url} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                </div>
            </div>
      </div>
    )
  
}

export default NewsItems
