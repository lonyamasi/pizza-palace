const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

fetch('http://localhost:5000/api/orders', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify([
    { size: 'Large', toppings: ['Pepperoni', 'Cheese'] },
    { size: 'Medium', toppings: ['Pepperoni', 'Cheese'] },
    { size: 'Small', toppings: ['Pepperoni', 'Cheese'] }
  ])
})
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error('Error:', err));