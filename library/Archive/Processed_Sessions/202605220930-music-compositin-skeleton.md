---
status: processed
type: creative-session
---
# 202605220930-music-composition-skeleton

[[music-composition-skeleton-protocol]]

Here’s a **minimal, direct MusicXML skeleton** for _Razor Pocket No. 1_ with two parts: **melody** and **bass**.  
You can paste this into MuseScore / Dorico / Finale / Sibelius and tweak engraving, swing, and layout.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 3.1 Partwise//EN"
  "http://www.musicxml.org/dtds/partwise.dtd">
<score-partwise version="3.1">
  <work>
    <work-title>Razor Pocket No. 1</work-title>
  </work>

  <part-list>
    <score-part id="P1">
      <part-name>Melody</part-name>
    </score-part>
    <score-part id="P2">
      <part-name>Bass</part-name>
    </score-part>
  </part-list>

  <!-- MELODY PART -->
  <part id="P1">
    <!-- Bar 1 -->
    <measure number="1">
      <attributes>
        <divisions>2</divisions>
        <key>
          <fifths>-1</fifths>
          <mode>minor</mode>
        </key>
        <time>
          <beats>4</beats>
          <beat-type>4</beat-type>
        </time>
        <clef>
          <sign>G</sign>
          <line>2</line>
        </clef>
      </attributes>
      <!-- D4 F4 A4 C5 (quarters) -->
      <note>
        <pitch><step>D</step><octave>4</octave></pitch>
        <duration>2</duration><type>quarter</type>
      </note>
      <note>
        <pitch><step>F</step><octave>4</octave></pitch>
        <duration>2</duration><type>quarter</type>
      </note>
      <note>
        <pitch><step>A</step><octave>4</octave></pitch>
        <duration>2</duration><type>quarter</type>
      </note>
      <note>
        <pitch><step>C</step><octave>5</octave></pitch>
        <duration>2</duration><type>quarter</type>
      </note>
    </measure>

    <!-- Bar 2: repeat motif -->
    <measure number="2">
      <note>
        <pitch><step>D</step><octave>4</octave></pitch>
        <duration>2</duration><type>quarter</type>
      </note>
      <note>
        <pitch><step>F</step><octave>4</octave></pitch>
        <duration>2</duration><type>quarter</type>
      </note>
      <note>
        <pitch><step>A</step><octave>4</octave></pitch>
        <duration>2</duration><type>quarter</type>
      </note>
      <note>
        <pitch><step>C</step><octave>5</octave></pitch>
        <duration>2</duration><type>quarter</type>
      </note>
    </measure>

    <!-- Bar 3: Gm7 motif (simple) -->
    <measure number="3">
      <note>
        <pitch><step>G</step><octave>4</octave></pitch>
        <duration>2</duration><type>quarter</type>
      </note>
      <note>
        <pitch><step>B</step><alter>-1</alter><octave>4</octave></pitch>
        <duration>2</duration><type>quarter</type>
      </note>
      <note>
        <pitch><step>D</step><octave>5</octave></pitch>
        <duration>2</duration><type>quarter</type>
      </note>
      <note>
        <pitch><step>F</step><octave>5</octave></pitch>
        <duration>2</duration><type>quarter</type>
      </note>
    </measure>

    <!-- Bar 4: back to Dm7 motif -->
    <measure number="4">
      <note>
        <pitch><step>D</step><octave>4</octave></pitch>
        <duration>2</duration><type>quarter</type>
      </note>
      <note>
        <pitch><step>F</step><octave>4</octave></pitch>
        <duration>2</duration><type>quarter</type>
      </note>
      <note>
        <pitch><step>A</step><octave>4</octave></pitch>
        <duration>2</duration><type>quarter</type>
      </note>
      <note>
        <pitch><step>C</step><octave>5</octave></pitch>
        <duration>2</duration><type>quarter</type>
      </note>
    </measure>

    <!-- Bars 5–8: Stabilize (simplified motif with swing feel left to playback) -->
    <measure number="5">
      <note>
        <pitch><step>D</step><octave>4</octave></pitch>
        <duration>1</duration><type>eighth</type>
      </note>
      <note>
        <pitch><step>F</step><octave>4</octave></pitch>
        <duration>1</duration><type>eighth</type>
      </note>
      <note>
        <pitch><step>A</step><octave>4</octave></pitch>
        <duration>2</duration><type>quarter</type>
      </note>
      <note>
        <pitch><step>C</step><octave>5</octave></pitch>
        <duration>2</duration><type>quarter</type>
      </note>
    </measure>

    <measure number="6">
      <note>
        <pitch><step>D</step><octave>4</octave></pitch>
        <duration>1</duration><type>eighth</type>
      </note>
      <note>
        <pitch><step>F</step><octave>4</octave></pitch>
        <duration>1</duration><type>eighth</type>
      </note>
      <note>
        <pitch><step>A</step><octave>4</octave></pitch>
        <duration>2</duration><type>quarter</type>
      </note>
      <note>
        <pitch><step>C</step><octave>5</octave></pitch>
        <duration>2</duration><type>quarter</type>
      </note>
    </measure>

    <measure number="7">
      <note>
        <pitch><step>D</step><octave>4</octave></pitch>
        <duration>1</duration><type>eighth</type>
      </note>
      <note>
        <pitch><step>F</step><octave>4</octave></pitch>
        <duration>1</duration><type>eighth</type>
      </note>
      <note>
        <pitch><step>A</step><octave>4</octave></pitch>
        <duration>2</duration><type>quarter</type>
      </note>
      <note>
        <pitch><step>C</step><octave>5</octave></pitch>
        <duration>2</duration><type>quarter</type>
      </note>
    </measure>

    <measure number="8">
      <note>
        <pitch><step>D</step><octave>4</octave></pitch>
        <duration>1</duration><type>eighth</type>
      </note>
      <note>
        <pitch><step>F</step><octave>4</octave></pitch>
        <duration>1</duration><type>eighth</type>
      </note>
      <note>
        <pitch><step>A</step><octave>4</octave></pitch>
        <duration>2</duration><type>quarter</type>
      </note>
      <note>
        <pitch><step>C</step><octave>5</octave></pitch>
        <duration>2</duration><type>quarter</type>
      </note>
    </measure>

    <!-- Bars 9–12: Contradict – chromatic line C#–D–Eb–E–F–A -->
    <measure number="9">
      <note>
        <pitch><step>C</step><alter>1</alter><octave>4</octave></pitch>