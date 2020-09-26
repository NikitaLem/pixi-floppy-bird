import { gameOptions } from "../../config/game.config";
export default class HitDetection {
    static hitTheGap(subject, collisions) {
        const subjectBounds = subject.getBounds();
        const collisionsBounds = collisions.map(collision => collision.getBounds());
        for (let i = 0; i < collisionsBounds.length; i++) {
            if (subjectBounds.x + subjectBounds.width > collisionsBounds[i].x &&
                subjectBounds.x < collisionsBounds[i].x + collisionsBounds[i].width) {
                if (subjectBounds.y > collisions[i].randomHeight &&
                    subjectBounds.y + subjectBounds.height < collisions[i].randomHeight + gameOptions.BALK_GAP) {
                    return true;
                }
                return false;
            }
        }
    }
    static hitBorders(subject, sizes) {
        const subjectBounds = subject.getBounds();
        if (subjectBounds.x <= 0 ||
            subjectBounds.x + subjectBounds.width >= sizes.width ||
            subjectBounds.y <= 0 ||
            subjectBounds.y + subjectBounds.height >= sizes.height)
            return true;
        return false;
    }
}
