const util = {
    minesAround: function (r, c, map) {
        let n = 0;
        for (let i = r - 1; i <= r + 1; i++) {
            if (i < 0 || i >= map.length) continue;
            for (let j = c - 1; j <= c + 1; j++) {
                if (j < 0 || j >= map[0].length) continue;
                if (map[i][j][0] === "mine") n++;
            }
        };
        return n
    },
    
    openCell: function (r,c,map) {
        const queue = [];
        queue.push([r,c])
        do {
          const [x,y] = queue[0];
          const val = map[x][y][0];
          if (map[x][y][1] !== val) {
            map[x][y][1] = val;
            if (val===0){
              for (let i=x-1;i<=x+1;i++) {
                if (i<0||i>=map.length) continue;
                for (let j=y-1;j<=y+1;j++){
                  if (j<0||j>=map[0].length) continue;
                  queue.push([i,j])
                }
              }  
            };
          }
          queue.shift()        
        } while (queue.length>0);
        
        return map
    }


}

export default util