

import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import service from "../appwrite/authservice";
import { Button } from "../components";
import Container from "../components/Container";
import parse from 'html-react-parser'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

export default function Postpage() {
    const [singlepost, setPost] = useState(null);
    const {slug} = useParams()
    const navigate = useNavigate();
    const userdata = useSelector((state) => state.auth.userdata);
    console.log(userdata)
    console.log(singlepost)
    useEffect(() => {
        console.log("postpage",slug)
        if (slug) {
            console.log("slug", slug)
            service.getpost(slug).then((post) => {
              console.log("postpage",post)
                if (post){
                    console.log("postpagepost",post.userid)
                    setPost(post)
                }
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);
    const deletePost = () => {
        service.deletepost(singlepost.$id).then((status) => {
            if (status) {
                service.deletefile(singlepost.featuredimage);
                navigate("/");
            }
        });
    };

    return singlepost ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={service.getfilepreview(singlepost.featureimage)}
                        alt={singlepost.tittle}
                        className="rounded-xl"
                    />
                        <div className="absolute right-6 mt-10 flex">
                            <Link to={`/edit-post/${singlepost.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{singlepost.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(singlepost.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}
