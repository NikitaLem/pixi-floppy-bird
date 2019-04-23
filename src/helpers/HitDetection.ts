import BalkSprite from "../gameobjects/balks/balkSprite";
import { gameOptions } from "../../config/game.config";

export default class HitDetection {

    public static hitTheGap(subject: PIXI.DisplayObject, collisions: BalkSprite[]): boolean | undefined {
        const subjectBounds = subject.getBounds();
        const collisionsBounds = collisions.map(collision => collision.getBounds());
        
        for (let i = 0; i < collisionsBounds.length; i++) {
            if (
                subjectBounds.x + subjectBounds.width > collisionsBounds[i].x && 
                subjectBounds.x < collisionsBounds[i].x + collisionsBounds[i].width
                ) {
                if (
                    subjectBounds.y > collisions[i].randomHeight &&
                    subjectBounds.y + subjectBounds.height < collisions[i].randomHeight + gameOptions.BALK_GAP
                ) {
                    return true;
                }

                return false;
            }
        }
    }

    public static hitBorders(subject: PIXI.DisplayObject, sizes: {width: number, height: number}): boolean {
        const subjectBounds = subject.getBounds();

        if (
            subjectBounds.x <= 0 ||
            subjectBounds.x + subjectBounds.width >= sizes.width ||
            subjectBounds.y <= 0 ||
            subjectBounds.y + subjectBounds.height >= sizes.height
            ) return true;

        return false;
    }
}
