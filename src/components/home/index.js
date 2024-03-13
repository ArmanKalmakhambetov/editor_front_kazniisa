import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { getBannerByCompanyIdAction, getUserInfo } from "@/store/slices/authSlice";
import jwtDecode from "jwt-decode";
import Link from "next/link";
import { addCompanyAction } from "@/store/slices/authSlice";
export default function Home() {

    const host ='http://localhost:8000'
    const token=localStorage.getItem('token')
    const TOKEN = useSelector((state) => state.auth.authToken);
    const CurrentCompany = useSelector((state) => state.auth.currentCompany);
    const CurrentUSER = useSelector((state) => state.auth.currentUser);
    let decodedToken=jwtDecode(token)
    console.log('decodec token from home',decodedToken)
    const CompanyId=decodedToken.companyId
    const dispatch=useDispatch()
    const banners= useSelector((state) => state.auth.bannersById);
    console.log('1 banners from UseSelector==',banners)
    const bannersArray=[]
    bannersArray.push(...banners)
    console.log('1.1 bannersArray=',bannersArray)
    const [bannersState, setBannersState] = useState([])
    // console.log('2 Current company from home=', CurrentCompany)
    // console.log('3 Current USER=-----', CurrentUSER)

    // useEffect(()=>{
    
    
    // dispatch(getUserInfo);
    
    // if (CurrentCompany!=null){
    //     dispatch(getBannerByCompanyIdAction(CurrentCompany))
    // }

    // // dispatch(getBannerByCompanyIdAction(CurrentCompany))
    
    
    // setBannersState(banners)
    
    // },[CurrentCompany,banners])
    useEffect(() => {
       dispatch(getUserInfo);
        // if (CurrentUSER.companyId!=undefined){
        //     dispatch(getUserInfo);
        // }
       
    

        if (CurrentCompany != null) {
            dispatch(getBannerByCompanyIdAction(CurrentCompany));
        }
    
        setBannersState(banners); // Moved to the effect function
    }, [CurrentCompany, dispatch]); // Listen to changes in CurrentCompany and banners



    // console.log(' 3 BANNERS ARRAY=',bannersArray)

    return(
        <div className='container'>
            
            {banners  ? (
                <div className="container-fluid">
                    <h1>Баннеры</h1>
                {bannersArray.map((item, index)=>(
                    
                    <div key={index} className="container mt-5 border mb-5">
                        
                        <div className="row p-3">
                            {/* <div className="col-sm-2">
                                <img  style={{'width':'100%'}} src={`${host}/${item.imageUrl}`} alt="alt banner"/>
                            </div> */}
                            <div className="col-sm-10">
                        
                                      {/* <p>Banner title: {item.title}</p> */}
                                        <p>Banner number: {item.bannerNumber}</p>
                                        <p>Banner address: {item.banerAddress} </p>
                                        <p>Banner unique code: {item.uniqueCode} </p>
                                        {/* <p>Banner created date: {item.createdDate}</p> */}
                                        {/* <p>Срок аренды(в днях): {item.rentDays}</p> */}
                                        {/* <p>Banner created date: {item.expiredDate}</p> */}
                                       
                                        


                                       
    
                                
                         
    
                                   
                                 
    
                              
                            </div>
                        </div>
                      
                                   
                    </div>
                      ))}
    
                </div>
            ) : (
                <>
                <h1>
                    Заполните компанию
                    <Link href="/addcompany">
                    <button className="btn btn-primary">
                        заполнить компанию
                    </button>
                    </Link>

                </h1>
                
                <h1>
                    Создайте баннер
                <Link href="/addbanner">
                <button className="btn btn-primary">
                    создать баннер
                </button>
                </Link>

                </h1>
                
                
                
                
                </>
            )}
            

        </div>
    );
}