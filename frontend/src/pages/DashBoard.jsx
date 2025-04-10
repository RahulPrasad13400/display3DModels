import React from 'react'
import ModelList from '../components/ModelList'
import Header from '../components/Header'

const datas = [ 
    {id : 1, name : 'abc', description : 'xyz'},
    {id : 2, name : 'pqr', description : 'mmm'}
]

export default function DashBoard() {
  return (
    <div className='flex flex-col items-center'>
        <Header />
        <h1 className='font-bold text-2xl'>Dashboard</h1>
        <div className='w-100 mt-10'>
        {datas.map((data)=>{
            return <ModelList key={data.id} data={data} />
        })}
        </div>
    </div>
  )
}
