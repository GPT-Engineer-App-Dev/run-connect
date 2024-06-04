import { Box, Container, VStack, HStack, Text, Button, Input, Textarea, IconButton, Image } from "@chakra-ui/react";
import { FaThumbsUp, FaComment } from "react-icons/fa";
import { useState } from "react";

const runsData = [
  {
    id: 1,
    user: "John Doe",
    distance: "5 km",
    time: "25:30",
    date: "2023-10-01",
    likes: 10,
    comments: [
      { user: "Jane Smith", text: "Great run!" },
      { user: "Bob Johnson", text: "Keep it up!" },
    ],
  },
  {
    id: 2,
    user: "Jane Smith",
    distance: "10 km",
    time: "50:45",
    date: "2023-10-02",
    likes: 20,
    comments: [],
  },
];

const Index = () => {
  const [runs, setRuns] = useState(runsData);
  const [newRun, setNewRun] = useState({ distance: "", time: "", date: "" });
  const [comment, setComment] = useState("");

  const handleLike = (id) => {
    const updatedRuns = runs.map((run) =>
      run.id === id ? { ...run, likes: run.likes + 1 } : run
    );
    setRuns(updatedRuns);
  };

  const handleComment = (id) => {
    const updatedRuns = runs.map((run) =>
      run.id === id
        ? { ...run, comments: [...run.comments, { user: "Current User", text: comment }] }
        : run
    );
    setRuns(updatedRuns);
    setComment("");
  };

  const handleUpload = () => {
    const newRunData = {
      id: runs.length + 1,
      user: "Current User",
      ...newRun,
      likes: 0,
      comments: [],
    };
    setRuns([newRunData, ...runs]);
    setNewRun({ distance: "", time: "", date: "" });
  };

  return (
    <Container maxW="container.lg" p={4}>
      <HStack spacing={4} mb={8}>
        <Button variant="link">Home</Button>
        <Button variant="link">My Runs</Button>
        <Button variant="link">Explore</Button>
        <Button variant="link">Profile</Button>
      </HStack>

      <VStack spacing={8} align="stretch">
        <Box p={4} borderWidth="1px" borderRadius="lg">
          <Text fontSize="xl" mb={4}>Upload New Run</Text>
          <Input
            placeholder="Distance"
            value={newRun.distance}
            onChange={(e) => setNewRun({ ...newRun, distance: e.target.value })}
            mb={2}
          />
          <Input
            placeholder="Time"
            value={newRun.time}
            onChange={(e) => setNewRun({ ...newRun, time: e.target.value })}
            mb={2}
          />
          <Input
            placeholder="Date"
            value={newRun.date}
            onChange={(e) => setNewRun({ ...newRun, date: e.target.value })}
            mb={2}
          />
          <Button onClick={handleUpload}>Upload</Button>
        </Box>

        {runs.map((run) => (
          <Box key={run.id} p={4} borderWidth="1px" borderRadius="lg">
            <Text fontSize="lg" fontWeight="bold">{run.user}</Text>
            <Text>Distance: {run.distance}</Text>
            <Text>Time: {run.time}</Text>
            <Text>Date: {run.date}</Text>
            <HStack spacing={4} mt={4}>
              <IconButton
                aria-label="Like"
                icon={<FaThumbsUp />}
                onClick={() => handleLike(run.id)}
              />
              <Text>{run.likes} Likes</Text>
            </HStack>
            <VStack align="stretch" mt={4}>
              {run.comments.map((comment, index) => (
                <Box key={index} p={2} borderWidth="1px" borderRadius="md">
                  <Text fontWeight="bold">{comment.user}</Text>
                  <Text>{comment.text}</Text>
                </Box>
              ))}
              <HStack mt={2}>
                <Textarea
                  placeholder="Add a comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <IconButton
                  aria-label="Comment"
                  icon={<FaComment />}
                  onClick={() => handleComment(run.id)}
                />
              </HStack>
            </VStack>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Index;