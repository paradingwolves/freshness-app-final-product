This application is meant to keep track of the expiry dates for your company or your own parishable goods.

To build this application we used React.js, Firebase, and Bootstrap 5

npm packages installed:
    - npm i firebase
    - npm i react-router-dom
    - npm i date-fns
    - npm i quagga
    - npm i react-firebase-hooks
    - npm i react-modal


------------------------------------------------------------------
    Date Modified: January 19, 2024
------------------------------------------------------------------
    1. Make the app work with a relational database 

------------------------------------------------------------------
    Date Modified: January 21, 2024
------------------------------------------------------------------
    1. Add Store Registration form and hook ---> when a user registers, it creates both 
                                                a user and document in the "stores" db
    2. when the store document is created, its own inventory collection is created
    3. user can now seed their store's database

------------------------------------------------------------------
    Date Modified: January 22, 2024
------------------------------------------------------------------
    1. Recreate the Add Stock Component and related hooks
    2. Stores can now view their own data as well as add their own data