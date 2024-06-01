import { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import MealsCard from './MealsCard';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Styles.css'
export default function MealsByCategory() {
    const [tabIndex, setTabIndex] = useState(0);
    const settings = {
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              infinite: true,
              dots: false
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots:false

            }
          }
          
        ]
      };
  return (
   <section className=' px-2 md:px-4'>
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}  >
      <TabList>
        <Tab>Breakfast</Tab>
        <Tab>Lunch</Tab>
        <Tab>Dinner</Tab>
        <Tab>All Meals</Tab>
      </TabList>
      
      {/* Tabpanel 1 start =========== */}
      <TabPanel>
          
           <Slider {...settings}   >
      <div className='px-2 mt-2'>
      <MealsCard/>
      </div>
      <div className='px-2 mt-2'>
      <MealsCard/>
      </div>
      <div className='px-2 mt-2'>
      <MealsCard/>
      </div>
      <div className='px-2 mt-2'>
      <MealsCard/>
      </div>
      <div className='px-2 mt-2'>
      <MealsCard/>
      </div>
      <div className='px-2 mt-2'>
      <MealsCard/>
      </div>
      <div className='px-2 mt-2'>
      <MealsCard/>
      </div>
    </Slider>
      </TabPanel>
      {/* Tabpanel 1 enn =========== */}
      {/* Tabpanel 2 start =========== */}
      <TabPanel>
            <h1>Lunch</h1>
      </TabPanel>
      {/* Tabpanel 2 end =========== */}
      {/* Tabpanel 3 start =========== */}
      <TabPanel>
            <h1>Dinner</h1>
      </TabPanel>
      {/* Tabpanel 3 end =========== */}
      {/* Tabpanel 4 start =========== */}
      <TabPanel>
                <h1>All Meals</h1>
      </TabPanel>
      {/* Tabpanel 4 end =========== */}
    </Tabs>
   </section>
  )
}
