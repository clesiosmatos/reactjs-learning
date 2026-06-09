// In JSX every tag must be closed — void elements need the trailing /
export default function SelfClosingTags() {
  return (
    <div>
      <p>These are self-closing tags (would be invalid in plain HTML without the slash):</p>
      <input type="text" placeholder="input /" />
      <br />
      <hr />
      <img src="https://placehold.co/80x40?text=img+/" alt="placeholder" />
    </div>
  )
}
