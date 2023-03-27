import React from "react";
import { Birds } from "./birds";
import { Mountains } from "./mountains";
import { Sun } from "./sun";

export function MountainRange() {
    return (
        <div className="relative overflow-hidden ">
            <div className="absolute w-full h-full mb-12 sky animate-fade" />
            <Birds />
            <Sun />
            <Mountains />
        </div>
    );
}