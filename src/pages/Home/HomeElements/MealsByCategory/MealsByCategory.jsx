import {  useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import MealsCard from './MealsCard';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Styles.css'
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';

export default function MealsByCategory() {
  const [tabIndex, setTabIndex] = useState(0);
  const axiosPublic = useAxiosPublic();

  const { data: mealsData = [], isLoading } = useQuery({
    queryKey: ['allMeals'],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/allMeals`)
      return data;
    }
  })

  //filter by category start =======================================
  const Breakfast = mealsData?.filter(meal => meal.category === 'Breakfast')
  const Lunch = mealsData?.filter(meal => meal.category === 'Lunch')
  const Dinner = mealsData?.filter(meal => meal.category === 'Dinner')
//filter by category end =======================================

  const settings = {
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true
        }
      },
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
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false

        }
      }

    ]
  };
  {isLoading && <div>Loading.........</div>}
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
            {
              Breakfast?.map((meal, idx) => <div key={idx} className='px-2 mt-2'>
                <MealsCard meal={meal} />
              </div>)
            }

          </Slider>
        </TabPanel>
        {/* Tabpanel 1 enn =========== */}
        {/* Tabpanel 2 start =========== */}
        <TabPanel>
          <Slider {...settings}   >
            {
              Lunch?.map((meal, idx) => <div key={idx} className='px-2 mt-2'>
                <MealsCard meal={meal} />
              </div>)
            }

          </Slider>
        </TabPanel>
        {/* Tabpanel 2 end =========== */}
        {/* Tabpanel 3 start =========== */}
        <TabPanel>
          <Slider {...settings}   >
            {
              Dinner?.map((meal, idx) => <div key={idx} className='px-2 mt-2'>
                <MealsCard meal={meal} />
              </div>)
            }

          </Slider>
        </TabPanel>
        {/* Tabpanel 3 end =========== */}
        {/* Tabpanel 4 start =========== */}
        <TabPanel>
          <Slider {...settings}   >
            {
              mealsData?.map((meal, idx) => <div key={idx} className='px-2 mt-2'>
                <MealsCard meal={meal} />
              </div>)
            }

          </Slider>
        </TabPanel>
        {/* Tabpanel 4 end =========== */}
      </Tabs>
    </section>
  )
}
