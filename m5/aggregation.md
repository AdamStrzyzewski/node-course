db.getCollection('cats').aggregate([
   // full set of data
  { $match: { age: { $gte: 5 } } },
  // only the matched
//   { $skip: 2 },
  // all but the first 2
//   { $limit: 2 }
  // the other 2
  {
     $group: {
        _id: 'averageAge',
        ageSum: { $sum: '$age' },
        catCount: { $sum: 1 },
        average: { $avg: '$age' }
     }  
  },
//   {
//     $project: {
//           ageSum:1,
//           catCount:1,
//           calculatedAverage : { $divide: ['$ageSum', '$catCount'] }
//         }    
//   },
   {
    $addFields: {
          calculatedAverage : { $divide: ['$ageSum', '$catCount'] }
     }    
  }
])



// lookup
db.getCollection('cats').aggregate([
{ $match: { owner: { $exists: true } } },
{ $lookup: {
      from: 'owners',
      localField: 'owner',
      foreignField: 'id',
      as: 'ownerCollectionData'
    }    
},
{
   $unwind: '$ownerCollectionData'    
},
{ $match: { 'ownerCollectionData.name':'Adam' } },
{ $group: {
    _id: '$_id',
    name: { $first: '$name' },
    age: { $first: '$age' },
    ownerCollectionData: { $push: '$ownerCollectionData' }
 } 
 }
])


dla chętnych 
{
    $addFields: {
        filteredOwnerCollectionData: { $filter:  }
    }
}