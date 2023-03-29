import React, { useState } from 'react'
import axios from 'axios'
import './easyview.css'
import { Link,NavLink } from 'react-router-dom'
import CardSmall from '../../Shared_Components/CardSmall'
import { useEffect } from 'react'

const EasyView = () => {

    useEffect(()=>{
        axios.get(`/new_arrival`)
            .then(res => {
                setView(res.data)
            })
    },[])

    const [view, setView] = useState([
        {
            id: 1,
            title: "Ikigai",
            src: 'https://images.unsplash.com/photo-1542393545-10f5cde2c810?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGxhcHRvcHxlbnwwfDF8MHx8&auto=format&fit=crop&w=500&q=60',
            rating: "5",
            price: "250",
        },
        {
            id: 2,
            title: "Ikigai",
            src: 'https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80',
            rating: "4",
            price: "260",
        },
    ])

    const [active,setActive]=useState([true,false,false,false])

    const handleView = (view) => {
        if(view=='new_arrival'){
            setActive([true,false,false,false])
        }
        else if(view=='trending'){
            setActive([false,true,false,false])
        }
        else if(view=='best_selling'){
            setActive([false,false,true,false])
        }
        else if(view=='popular'){
            setActive([false,false,false,true])
        }

        axios.get(`/${view}`)
            .then(res => {
                console.log(res)
                setView(res.data)
            })
    }

    return (
        <div className='easyview'>
            <ul >
                <li className={active[0]==true?'active':''} onClick={() => handleView('new_arrival')}>NEW ARRIVAL</li>
                <li className={active[1]==true?'active':''} onClick={() => handleView('trending')}>TRENDING</li>
                <li className={active[2]==true?'active':''} onClick={() => handleView('best_selling')}>BEST SELLING</li>
                <li className={active[3]==true?'active':''} onClick={() => handleView('popular')}>POPULAR</li>
                
            </ul>
            <div className='easydata'>
                {view.length>0
                    ? view.map(product => {
                        return <CardSmall props={product} />
                    })
                    : <h2 style={{'margin':'10px auto'}}>No Product found</h2>
                    
                }
            </div>
        </div>
    )
}

export default EasyView