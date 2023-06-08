import Heading from "../Heading";
import { UserCircle } from "@phosphor-icons/react";
import Text from "../Text";
import Button from "../Button";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { getAuthHeader, getUserId } from "../../services/auth";

interface Profile {
    id: string
    name: string
    following: string[]
    followers: string[]
}


function FriendList() {
    const authHeader = getAuthHeader();
    const myProfileId = getUserId();
/*  const [profiles, setProfiles] = useState<Profile[]>([]); */
    const [profiles, setProfiles] = useState<Profile[]>([]);

    
    useEffect(() => {
        async function getProfiles() {
            try {
                const { data } = await api.get("/user/get/all", authHeader);    
                setProfiles(data.users);

/*                 const followList = await api.get("/user/follow/get/id", {params: {userId: myProfileId}});
                console.log("follolist :", followList.data); */
            } catch(err) {
                alert("Erro ao tentar obter os perfis");
            }
        }
        
        getProfiles();      
    }, []);
/*     const user = localStorage.getItem("user");
    console.log("prof2",profiles);
    profiles.map(users => console.log("map", users)); */


    async function handleFollow(profileId: string) {
        try {
            /* const [profile, ... rest] = profiles.filter(profile => profile._id == profileId);
            !profile.followers.includes(myProfileId) && (await api.post(`/profiles/${profileId}/follow`, null, authHeader)); */
            //await api.post(`/profiles/${profileId}/follow`, null, authHeader);

            const request = {
                userId: myProfileId,
                userIdToFollow: profileId,
            };
            await api.post("/user/follow/following", request);
        
            /* setProfiles((profiles) => {
                const newProfiles = profiles.map((profile) => {
                    console.log("prof dosetprof", profile)
                    if (profile.id == profileId) {
                        !profile.followers.includes(myProfileId) && profile.followers.push(myProfileId) ;
                    }
                    return profile;
                });
                return [ ... newProfiles];
            }) */

        } catch (err) {
            alert("Erro ao tentar seguir perfil.");
        }
    }

    return (
        <div className="basis-5/6 overflow-y-auto scroll-smooth">
            <div className="border-b w-full">
                <Heading className="border-b border-slate-400 mt-4">
                    <Text size="lg" className="font-extrabold ml-5">
                        Amigos
                    </Text>
                </Heading>
            </div>

            <ul>
                {/* {profiles && profiles.map((profile) => ( */}
                {profiles && profiles.map(profile => (
                    <li 
                        className="flex flex-col ml-5 my-5 w-full max-w-sm"
                        key={profile.id}
                    >
                        <div className="flex items-center">
                            <UserCircle size={48} weight="thin" className="text-slate-50" />
                            <Text className="ml-2 font-extrabold">{profile.name}</Text>
                        </div>

                        <div className="flex items-center ml-2">
                            <Text>
                               {/*  {profile.followers.length > 0 && 
                                `${profile.followers.length} seguidores`} */}
                            </Text>
                        </div>
                        <div className="flex items-center ml-2">
                            <Text>
                             {/*    {profile.following.length > 0 &&
                                `Seguindo ${profile.following.length}`} */}
                            </Text>
                        </div>
                        <Button
                            className="my-2"
                            onClick={() => handleFollow(profile.id)}
                            /* disabled={profile.followers.includes(myProfileId)} */
                        >Seguir</Button>
                        {/* mt-6 my-4 bg-[#81D8F7] */}
                    </li>
                ))}
            </ul>
            
        </div>
    );
}

export default FriendList;