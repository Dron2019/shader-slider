#define GLSLIFY 1
uniform sampler2D texture;
uniform sampler2D texture1;
uniform float offset1;
uniform float offset2;
uniform vec2 channelOffsets[4];
uniform vec4 channelMult[4];
uniform vec2 resolution;
uniform vec2 u_mouse;
uniform float dist;
varying vec2 vUv;
float PHI = 1.61803398874989484820459;  // Φ = Golden Ratio   

float gold_noise(in vec2 xy, in float seed){
       return fract(tan(distance(xy*PHI, xy)*seed)*xy.x);
}
void main() {
    vec2 uv = vUv;
    vec2 pixel = gl_FragCoord.xy / resolution;
    float correctDistance = dist * (resolution.x / resolution.y);
    float red = texture2D(texture, vec2(pixel.x, pixel.y + offset1)).r;
    float green = texture2D(texture, pixel).g;
    float blue = texture2D(texture, vec2(pixel.x, pixel.y + offset2)).b;
    float alpha = texture2D(texture, pixel).a;

    vec4 channel0 = texture2D(texture, pixel * (uv + channelOffsets[0]));
    vec4 channel1 = texture2D(texture, pixel * (uv + channelOffsets[1]));
    vec4 channel2 = texture2D(texture, pixel * (uv + channelOffsets[2]));
    vec4 channel3 = texture2D(texture, pixel * (uv + channelOffsets[3]));

    float point = pow(pow((gl_FragCoord.x) - u_mouse.x, 2.0) + pow((gl_FragCoord.y) - u_mouse.y, 2.0), 2.0);
    vec4 color = texture2D(texture,pixel);
    vec4 color1 = texture2D(texture1,pixel);
    if (point <= pow(correctDistance,2.0)) {
        gl_FragColor = color1;
    } else {

        // gl_FragColor = color1* vec4(1.0,0.0,0.0,1.0);
         gl_FragColor = vec4(vec3(red, green, blue), alpha);
        // gl_FragColor = channelMult[0] * channel0 + channelMult[1] * channel1 + channelMult[2] * channel2 + channelMult[3] * channel3 ; 
        // gl_FragColor = vec4(1.0,0.0,0.0,1.0);
    }
 }

 /**//**//**//**/