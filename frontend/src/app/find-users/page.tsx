"use client";

import React, { useState } from "react";
import { Input } from "../../components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { IoSearchOutline } from "react-icons/io5";
import { Button } from "../../components/ui/button";
import { userService } from "@/services/api";
import { FaUserPlus } from "react-icons/fa";

interface UserResult {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
}

const FindUsers: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<UserResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [addingContact, setAddingContact] = useState<Record<string, boolean>>({});

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;

        setIsSearching(true);
        try {
            const results = await userService.searchUsers(searchQuery);
            setSearchResults(results);
        } catch (error) {
            console.error("Error searching users:", error);
        } finally {
            setIsSearching(false);
        }
    };

    const handleAddContact = async (userId: string) => {
        setAddingContact(prev => ({ ...prev, [userId]: true }));
        try {
            await userService.addContact(userId);
            setAddingContact(prev => ({ ...prev, [userId]: false }));

            // Remove user from results after adding
            setSearchResults(prev => prev.filter(user => user._id !== userId));
        } catch (error) {
            console.error("Error adding contact:", error);
            setAddingContact(prev => ({ ...prev, [userId]: false }));
        }
    };

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .toUpperCase();
    };

    return (
        <div className="p-4 bg-primary text-white h-full overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Find Users</h2>

            <div className="flex mb-4">
                <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <IoSearchOutline className="text-gray-400" />
                    </div>
                    <Input
                        type="text"
                        placeholder="Search by name or email..."
                        className="pl-10 py-2 text-white bg-secondary border border-accent/20 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-accent w-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    />
                </div>
                <Button
                    className="bg-accent text-white rounded-r-lg hover:bg-opacity-90"
                    onClick={handleSearch}
                    disabled={isSearching}
                >
                    {isSearching ? "Searching..." : "Search"}
                </Button>
            </div>

            {searchResults.length > 0 ? (
                <div className="space-y-2">
                    {searchResults.map((user) => (
                        <div key={user._id} className="flex justify-between items-center bg-secondary p-3 rounded-lg">
                            <div className="flex items-center">
                                <Avatar className="mr-3 h-10 w-10">
                                    {user.avatar ? (
                                        <AvatarImage src={user.avatar} alt={user.name} />
                                    ) : (
                                        <AvatarFallback className="bg-accent/50 text-white">
                                            {getInitials(user.name)}
                                        </AvatarFallback>
                                    )}
                                </Avatar>
                                <div>
                                    <div className="font-medium">{user.name}</div>
                                    <div className="text-xs text-gray-400">{user.email}</div>
                                </div>
                            </div>
                            <Button
                                onClick={() => handleAddContact(user._id)}
                                disabled={addingContact[user._id]}
                                className="bg-accent hover:bg-opacity-80 text-white px-3 py-1 rounded-md flex items-center gap-1"
                            >
                                <FaUserPlus />
                                {addingContact[user._id] ? "Adding..." : "Add"}
                            </Button>
                        </div>
                    ))}
                </div>
            ) : searchQuery && !isSearching ? (
                <div className="text-center py-10 text-gray-400">
                    No users found matching "{searchQuery}"
                </div>
            ) : null}
        </div>
    );
};

export default FindUsers;