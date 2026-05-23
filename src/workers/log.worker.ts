let lines: string[] = [];

self.onmessage = async (e: MessageEvent) => {
  const { type, payload, id } = e.data;

  try {
    switch (type) {
      case 'LOAD_FILE': {
        const { text } = payload;
        
        // Split by newline and store globally in the worker
        lines = text.split(/\r?\n/);
        
        self.postMessage({ 
          type: 'SUCCESS', 
          data: { totalLines: lines.length }, 
          id 
        });
        break;
      }
      
      case 'SEARCH': {
        const { query, useRegex, matchCase } = payload;
        
        if (!query) {
          // If no query, return null to indicate "show all"
          self.postMessage({ type: 'SUCCESS', data: { indices: null, totalMatches: lines.length }, id });
          return;
        }

        const matches: number[] = [];
        
        if (useRegex) {
          try {
            const regex = new RegExp(query, matchCase ? 'g' : 'gi');
            for (let i = 0; i < lines.length; i++) {
              if (regex.test(lines[i])) {
                matches.push(i);
              }
              regex.lastIndex = 0;
            }
          } catch (e: any) {
            throw new Error(`Invalid regex: ${e.message}`);
          }
        } else {
          const searchStr = matchCase ? query : query.toLowerCase();
          for (let i = 0; i < lines.length; i++) {
            const line = matchCase ? lines[i] : lines[i].toLowerCase();
            if (line.includes(searchStr)) {
              matches.push(i);
            }
          }
        }
        
        // Convert to Uint32Array for fast, zero-copy transfer back to main thread
        const typedArray = new Uint32Array(matches);
        
        self.postMessage(
          { type: 'SUCCESS', data: { indices: typedArray, totalMatches: matches.length }, id },
          // @ts-ignore
          [typedArray.buffer] // Transfer the buffer
        );
        break;
      }

      case 'CLEAR': {
        lines = [];
        self.postMessage({ type: 'SUCCESS', data: null, id });
        break;
      }

      default:
        self.postMessage({ type: 'ERROR', error: `Unknown command ${type}`, id });
    }
  } catch (err: any) {
    self.postMessage({ type: 'ERROR', error: err.message, id });
  }
};
