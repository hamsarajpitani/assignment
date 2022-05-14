import { useCallback, useEffect, useState } from "react";
import debounce from "lodash/debounce";
import axios from "axios";


//BASE_URL: http://3.108.244.88:5000

// GET /api/user-access-token
// This API will fetch the user-access-token, which will be required
// in the headers of the other private API Requests
// GET /api/data?search_string=
// This API will require the user-access-token as one of the header
// parameters, otherwise it will throw an unAuthorized Error. It takes
// search_string as one of the query parameters and returns the data
// which matches the string. 
var config;
const Test = ()=>{
    const [data,setData] = useState([]);
    const [search,setSearch] = useState("");
    
    const getToken = async ()=>{
      const token = await axios.get("http://3.108.244.88:5000/api/user-access-token")
      config = {
          headers : {
              "user-access-token": `${token.data.token}`,
              "type" : "application/json"
          }
        }
    }

    useEffect(()=>{
        getToken()
    },[])



    const debounceSearch = async (value)=>{
        setSearch(value)
        const getResult = await axios.get(`http://3.108.244.88:5000/api/data?search_string=${search}`,config);
        setData(getResult.data)
        // debounce(()=>{
        //     setData(getResult.data)
        // },300)
    }

    const handleSearch =  (e)=>{
        const {value} = e.target;
        debounceSearch(value)
    }
    
    return(
        <>
         <input type="text" value={search} onChange={handleSearch} />
          {
               data.length > 1 && search ? data?.map((d,index) =>(
                  <div key={index}>
                  <p>{d}</p>
                  </div>
              )) : 
              <p>please enter something valid</p>
              
          }      
        </>
    )
}

export default Test;