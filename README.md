# js-array-object-map-performance
Compare insert, find, delete performance of built-in javascript objects : Array vs Object vs Map

These are a few key points to keep in mind while using the standard default javascript objects. In spite of the fact that javascript offers the flexibility of utilizing more than one built-in objects, it is better to pick the one that suits the best. 
Don't hesitate to leave your remarks beneath.

# The process
UUID array, map and object are used to compare performance
Same UUID's used for all of them, the total count of UUID's are also same for all.
Size between 100K to 1 million taken to perform each operation
Total 10 Find/Delete/Insert done for each size
Averate of 10 operation is considered for comparision.


Performance comparision done for  
...    insert operation
...    find operation
...    delete operation 

| Action/Size    | 100000 | 200000 | 300000 | 400000 | 500000 | 600000 | 700000 | 800000 | 900000  | 1000000 |
|----------------|--------|--------|--------|--------|--------|--------|--------|--------|---------|---------|
| Delete->Array  | 0.0023 | 0.0021 | 0.0022 | 0.0022 | 0.0025 | 0.0023 | 0.0026 | 0.0029 | 0.0030  | 0.0028  |
| Delete->Map    | 0.0087 | 0.0084 | 0.0087 | 0.0083 | 0.0088 | 0.0088 | 0.0090 | 0.0089 | 0.0088  | 0.0094  |
| Delete->Object | 0.0016 | 0.0013 | 0.0014 | 0.0013 | 0.0014 | 0.0014 | 0.0014 | 0.0211 | 0.0016  | 0.0019  |
| Find--->Array  | 1.1588 | 2.4480 | 3.0394 | 3.1688 | 6.3098 | 4.8208 | 6.7844 | 9.6759 | 11.3242 | 7.7778  |
| Find--->Map    | 0.0027 | 0.0027 | 0.0030 | 0.0029 | 0.0033 | 0.0026 | 0.0033 | 0.0038 | 0.0038  | 0.0044  |
| Find--->Object | 0.0030 | 0.0032 | 0.0029 | 0.0027 | 0.0035 | 0.0028 | 0.0029 | 0.0040 | 0.0040  | 0.0043  |
| Insert->Array  | 0.0020 | 0.0049 | 0.0018 | 0.0017 | 0.0019 | 0.0018 | 0.0018 | 0.0020 | 0.0023  | 0.0027  |
| Insert->Map    | 0.0029 | 0.0024 | 0.0027 | 0.0028 | 0.0028 | 0.0048 | 0.0028 | 0.0031 | 0.0036  | 0.0034  |
| Insert->Object | 0.0017 | 0.0016 | 0.0017 | 0.0016 | 0.0036 | 0.0017 | 0.0017 | 0.0022 | 0.0022  | 0.0026  |    
    
# Observation
...Find Operation, Array takes maximum time, Map and Object Find is almost similar performance
...Delete Operation, Map takes maximum time and Object is the fastest 
...Insert Operation, Map takes maximum time and Object is the fastest
# Ackonwledgement
[Create Command line Javascript application] (https://opensource.com/article/18/7/node-js-interactive-cli)

[QuickGUID generator] (https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript)

[High resolution time in Javascript ] (https://nodejs.org/api/process.html#process_process_hrtime_time & https://stackoverflow.com/questions/6233927/microsecond-timing-in-javascript)

[Article on Array, Map, Object ](-https://codeburst.io/array-vs-set-vs-map-vs-object-real-time-use-cases-in-javascript-es6-47ee3295329b)

# TO DO
-User different type of meathods to manage arrays (find/insert/delete)
-User different type of meathods to manage Object (delete)

Please feel free to contribute
