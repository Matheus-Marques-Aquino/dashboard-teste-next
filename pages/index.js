import SideBar from '../components/Sidebar/Sidebar';

import PlansTable from '@/components/Petlove/PlansTable';

import axios from 'axios';

import { useEffect, useState } from 'react';

export default function Home() {
  const [planList, setPlanList] = useState([]);
  const [propertyList, setPropertyList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {      

      const res = await fetch('/api/petlove');
      const data = await res.json();

      console.log('data', data)

      setLoading(false);

      if (data && Array.isArray(data.petData)) {
        setPlanList(data.petData);
      }

      if (data && Array.isArray(data.petProperty)) {
        setPropertyList(data.petProperty);
      }
    };

    fetchData();
  }, []);

  return (
    <main
      className=""
    >
      <div
        className="flex"
      >
        <SideBar />
        <div
          className="md:ml-56 flex w-full h-screen"
        >
          <div 
            className="mx-auto p-4"
          >
            <PlansTable loading={loading} results={planList} properties={propertyList}/>
          </div>
          
        </div>
      </div>
      
    </main>
  )
}
