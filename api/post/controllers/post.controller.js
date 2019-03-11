const Post = require('../models/post.model');

exports.post_create = function (req, res) {
    let post = new Post(
        {
            id: req.body.id,
            subject: req.body.subject,
            level: req.body.level,
            start_time: req.body.start_time,
            end_time: req.body.end_time,
            location: req.body.location,
            expect_price: req.body.expect_price,
            detail: req.body.detail,
            timestamp: req.body.timestamp,
            creator_id: req.body.creator_id,
            creator_username: req.body.creator_name,
            creator_type: req.body.creator_type

        }
    );

    if (Object.keys(post.toJSON()).length == 12){
        return res.status(201).json("Post created");
    }
    return res.status(400).json("Bad request");
};