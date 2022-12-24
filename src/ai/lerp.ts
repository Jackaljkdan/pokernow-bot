/**
 * Linear interpolation, works like https://docs.unity3d.com/ScriptReference/Mathf.Lerp.html
 */
export function lerp(min: number, max: number, t: number) {
    return min + (max - min) * t;
}
