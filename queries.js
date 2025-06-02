// Task 2
// 1. Books in specific genre
db.books.find({ genre: "Fiction" });

// 2. Books published after 1950
db.books.find({ published_year: { $gt: 1950 } });

// 3. Books by George Orwell
db.books.find({ author: "George Orwell" });

// 4. Update price of '1984'
db.books.updateOne({ title: "1984" }, { $set: { price: 13.99 } });

// 5. Delete 'Moby Dick'
db.books.deleteOne({ title: "Moby Dick" });

// Task 3
// 1. In stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } });

// 2. Projection: title, author, price
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 });

// 3. Sort price ascending
db.books.find().sort({ price: 1 });

// 4. Sort price descending
db.books.find().sort({ price: -1 });

// 5. Pagination - page 1
db.books.find().limit(5);

// 6. Pagination - page 2
db.books.find().skip(5).limit(5);

// Task 4 - Aggregation
// 1. Average price by genre
db.books.aggregate([{ $group: { _id: "$genre", average_price: { $avg: "$price" } } }]);

// 2. Author with most books
db.books.aggregate([{ $group: { _id: "$author", count: { $sum: 1 } } }, { $sort: { count: -1 } }, { $limit: 1 }]);

// 3. Group by publication decade
// db.books.aggregate({
{ $group: {
    _id: { $concat: [{ $toString: { $multiply: [{ $floor: { $divide: ["$published_year", 10] } }, 10] } }, "s"] },
    count: { $sum: 1 } 
} },
{ $sort: { _id: 1 } }
})

// Task 5 - Indexes
// Create index on title
db.books.createIndex({ title: 1 });

// Compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 });

// Explain performance
db.books.find({ title: "1984" }).explain("executionStats");
