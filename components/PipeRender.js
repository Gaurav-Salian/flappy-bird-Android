import React from 'react';
import { View, Image } from 'react-native';

const PipeRenderer = ({ pipesState, GAME_HEIGHT, PIPE_GAP }) => {
  const pipeWidth = 80;
  const pipeOpenHeight = 60;
  const midPipeSegmentHeight = pipeWidth * (517 / 410);

  return (
    <>
      {pipesState.map((pipe) => (
        <View key={pipe.id} style={{ position: 'absolute', left: pipe.x, top: 0, width: pipeWidth, height: GAME_HEIGHT }}>
          {/* Top pipe body */}
          <View style={{ position: 'absolute', top: 0, height: pipe.topHeight - pipeOpenHeight, width: pipeWidth, overflow: 'hidden' }}>
            {Array.from({ length: Math.ceil((pipe.topHeight - pipeOpenHeight) / midPipeSegmentHeight) }).map((_, i) => (
              <Image 
                key={i}
                source={require('../assets/images/mid-pipe.png')} 
                style={{ 
                  width: pipeWidth,
                  height: midPipeSegmentHeight,
                  position: 'absolute',
                  top: i * midPipeSegmentHeight,
                }}
                resizeMode="cover"
              />
            ))}
          </View>
          
          {/* Top pipe opening */}
          <Image 
            source={require('../assets/images/pipe-open.png')} 
            style={{ 
              position: 'absolute',
              width: pipeWidth + 20,
              left: -10,
              height: pipeOpenHeight - 20,
              top: pipe.topHeight - pipeOpenHeight,
            }}
            resizeMode="contain"
          />
          
          {/* Bottom pipe opening */}
          <Image 
            source={require('../assets/images/pipe-open.png')} 
            style={{ 
              position: 'absolute',
              width: pipeWidth + 20,
              left: -10,
              height: pipeOpenHeight + 20,
              top: pipe.topHeight + PIPE_GAP,
              transform: [{ rotate: '180deg' }]
            }}
            resizeMode="contain"
          />
          
          {/* Bottom pipe body */}
          <View style={{ position: 'absolute', top: pipe.topHeight + PIPE_GAP + pipeOpenHeight, height: GAME_HEIGHT - pipe.topHeight - PIPE_GAP - pipeOpenHeight, width: pipeWidth, overflow: 'hidden' }}>
            {Array.from({ length: Math.ceil((GAME_HEIGHT - pipe.topHeight - PIPE_GAP - pipeOpenHeight) / midPipeSegmentHeight) }).map((_, i) => (
              <Image 
                key={i}
                source={require('../assets/images/mid-pipe.png')} 
                style={{ 
                  width: pipeWidth,
                  height: midPipeSegmentHeight,
                  position: 'absolute',
                  top: i * midPipeSegmentHeight,
                }}
                resizeMode="cover"
              />
            ))}
          </View>
        </View>
      ))}
    </>
  );
};

export default React.memo(PipeRenderer);