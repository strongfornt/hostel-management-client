

// eslint-disable-next-line react/prop-types
export default function UpcomingMealForm({meal}) {
    const {title, images, category , ingredientsItems, price, rating, currentTime, description    } = meal || {}
   
  return (
    <>  
    <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-base-100">
            
            <div className="grid grid-cols-6 gap-4 col-span-full ">
              <div className="col-span-full ">
                <label htmlFor="title" className="block text-sm">
                  Assignment Title
                </label>
                <input
                  readOnly
                  type="text"
                  name="title"
                  id="title"
                  defaultValue={title}
                  placeholder="Assignment title "
                  className="w-full px-3 py-2 border outline-none rounded-md bg-transparent border-gray-300  focus:ring-1 focus:ring-[#3F72AF]"
                />
              </div>
              <div className="col-span-full ">
                <label htmlFor="image" className="block text-sm    ">
                  Image link
                </label>
                <input
                  readOnly
                    defaultValue={images}
                  type="text"
                  name="image"
                  id="image"
                  placeholder="Meal image"
                  className="w-full px-3 py-2 border outline-none rounded-md bg-transparent border-gray-300  focus:ring-1 focus:ring-[#3F72AF]"
                />
              </div>

              <div className="col-span-full ">
                <label htmlFor="category" className="block text-sm">
                  Meal Category
                </label>

                <select
                  required
                  readOnly
                  defaultValue={category}
                  id="category"
                  name="category"
                  className="w-full px-3 py-2 border outline-none rounded-md bg-transparent border-gray-300  focus:ring-1 focus:ring-[#3F72AF]"
                >
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                </select>
              </div>
              <div className="col-span-full ">
                <label htmlFor="ingredients" className="block text-sm">
                  Ingredients
                </label>
                <input
                 readOnly
                 defaultValue={ingredientsItems}
                  type="text"
                  name="ingredients"
                  id="ingredients"

                  placeholder="egg, potatoes..."
                  className="w-full px-3 py-2 border outline-none rounded-md bg-transparent border-gray-300 focus:ring-1 focus:ring-[#3F72AF]"
                />
              </div>
              <div className="col-span-full ">
                <label htmlFor="price" className="block text-sm">
                  Price
                </label>
                <input
                 readOnly
                    defaultValue={price}
                  type="number"
                  name="price"
                  id="price"
                  step="0.01" 
                  min="0"

                  placeholder="$Price"
                  className="w-full px-3 py-2 border outline-none rounded-md bg-transparent border-gray-300 focus:ring-1 focus:ring-[#3F72AF]"
                />
              </div>
              <div className="col-span-full ">
                <label htmlFor="rating" className="block text-sm">
                  Rating
                </label>
                <input
                 readOnly
                    defaultValue={rating}
                  type="number"
                  name="rating"
                  id="rating"
                  step="0.01"
                  min={1}
                  max={5}
                  placeholder="Rating"
                  className="w-full px-3 py-2 border outline-none rounded-md bg-transparent border-gray-300 focus:ring-1 focus:ring-[#3F72AF]"
                />
              </div>
              <div className="col-span-full ">
                <label htmlFor="time" className="block text-sm">
                  Posted Time
                </label>
                <input
                  readOnly
                  type="text"
                  name="time"
                  id="time"
                 defaultValue={currentTime}
                  
                  placeholder="Time"
                  className="w-full px-3 cursor-not-allowed py-2 border outline-none rounded-md bg-transparent border-gray-300 focus:ring-1 focus:ring-[#3F72AF]"
                />
              </div>

              <div className="col-span-full ">
                <label htmlFor="description" className="block text-sm">
                  Short description
                </label>
                <textarea
                  readOnly
                 defaultValue={description}
                  type="text"
                  name="description"
                  id="description"
                  placeholder="description "
                  className="w-full px-3 py-2 border outline-none rounded-md bg-transparent border-gray-300 focus:ring-1 focus:ring-[#3F72AF]"
                />
              </div>
            </div>
          </fieldset>
    </>
  )
}
