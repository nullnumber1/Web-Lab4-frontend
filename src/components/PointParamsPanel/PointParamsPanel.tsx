import React, {useState} from 'react';
import classes from "./PointParamsPanel.module.css";
import { KeyFilterType } from 'primereact/keyfilter';
import {useDispatch, useSelector} from "react-redux";
import { Slider } from 'primereact/slider';
import { InputText } from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {pointAPI} from "../../api/PointService";
import {IPoint} from "../../models/IPoint";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";

const PointParamsPanel = (props: any) => {

    const dispatch = useAppDispatch();

    const [submitPoint, {}] = pointAPI.useSubmitNewPointMutation();

    const handleSubmit = async () => {
        await submitPoint({
            x: Number(stateX),
            y: Number(stateY),
            r: Number(stateR)
        } as IPoint);
    }

    const changeX = (x: string) => {
        dispatch({type: "X_CHANGE", payload: x})
    }

    const changeY = (y: string) => {
        dispatch({type: "Y_CHANGE", payload: y})
    }

    const changeR = (r: string) => {
        dispatch({type: "R_CHANGE", payload: r})
    }

    const stateX = useAppSelector(state => state.point.x);
    const stateY = useAppSelector(state => state.point.y);
    const stateR = useAppSelector(state => state.point.r);

    return (
        <div className={classes.pointParamsPanel}>
            <div className={classes.slider_container}>
            <label className={classes.label}>R: {stateR}</label>
                    <Slider
                    style={{width : '150px'}}
                    value={stateR}
                    min={0.0}
                    max={5.0}
                    onChange={(e) =>
                    changeR(String(e.value))}
                    />
            </div>
            <div className={classes.slider_container}>
            <label className={classes.label}>X: {stateX}</label>
                    <Slider
                    style={{width : '150px'}}
                    value={stateX}
                    min={-3.0}
                    max={5.0}
                    onChange={(e) =>
                    changeX(String(e.value))}
                    />
            </div>
            <div className={classes.text_container}>
                <label>Y:
                    <InputText id="y-selector"
                               placeholder="Input Y..."
                               maxLength={3}
                               value={stateY}
                               keyfilter={/^[012345+-.]+$/}
                               onChange={(event) => {
                                   changeY(event.target.value);
                               }}
                    />
                </label>
            </div>

            <div className={classes.button_container}>
                <Button
                        type="submit"
                        onClick={(e) => handleSubmit()}>
                    Submit
                </Button>
            </div>
        </div>
    );
};

export default PointParamsPanel;